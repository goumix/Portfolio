# 🧭 Comprendre le Flux de Navigation : Touche → Nouvelle Page

## Objectif pédagogique
Comprendre comment une simple pression de touche (flèche directionnelle) déclenche l'affichage d'une nouvelle page dans l'application.

---

## 📋 Vue d'ensemble du flux

```
Touche clavier (ArrowUp/Down/Left/Right)
    ↓
LayoutLabyrinth.tsx → handleKeyDown
    ↓
navigate(direction) → useLabyrinthStore
    ↓
navigateTo(targetPage) → Met à jour currentPage
    ↓
currentPage change → Store Zustand notifie les composants
    ↓
AnimatePresence détecte le changement de key={currentPage}
    ↓
Animation de transition (framer-motion)
    ↓
page.tsx re-render avec le nouveau currentPage
    ↓
Nouvelle page affichée ✨
```

---

## 🔍 Analyse détaillée étape par étape

### Étape 1 : L'événement clavier (`keydown`)

**Fichier :** `src/components/LayoutLabyrinth.tsx`
**Lignes :** 131-157

```typescript
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    // Mapping des touches vers les directions
    const keyToDirection: Record<string, Direction> = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right'
    }

    const direction = keyToDirection[event.key]
    if (direction) {
      event.preventDefault()
      navigate(direction)  // ← On appelle la fonction du store
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [navigate, toggleMinimap])
```

**Ce qui se passe :**
- Un `useEffect` écoute tous les événements `keydown` sur la fenêtre
- Quand une flèche est pressée, on convertit la touche en `Direction` ('up', 'down', 'left', 'right')
- On appelle `navigate(direction)` qui vient du store Zustand

**Concept clé :** `useEffect` avec dépendances `[navigate, toggleMinimap]` - le listener est recréé si ces fonctions changent.

---

### Étape 2 : La navigation dans le store (`navigate`)

**Fichier :** `src/stores/useLabyrinthStore.ts`
**Lignes :** 241-253

```typescript
navigate: (direction: Direction) => {
  const { currentPage, navigationMap } = get()
  const currentPageMap = navigationMap[currentPage]
  const targetPage = currentPageMap?.[direction]

  if (targetPage) {
    get().navigateTo(targetPage)  // ← Navigation valide
  } else {
    // Navigation invalide → page 404
    get().navigateTo('404')
    get().unlockEasterEgg('404-finder')
  }
}
```

**Ce qui se passe :**
1. On récupère la page actuelle (`currentPage`) et la carte de navigation (`navigationMap`)
2. On cherche dans `navigationMap[currentPage]` si la direction existe
3. Si oui → on appelle `navigateTo(targetPage)`
4. Si non → on va sur la page '404' (easter egg !)

**Exemple concret :**
- Page actuelle : `'home'`
- Direction : `'up'`
- `navigationMap['home']` = `{ up: 'formation', down: 'ai', left: 'projects', right: 'personal' }`
- `targetPage` = `'formation'`
- On appelle `navigateTo('formation')`

**Concept clé :** Le `navigationMap` définit la structure du labyrinthe. C'est une carte statique qui dit "depuis la page X, la direction Y mène à la page Z".

---

### Étape 3 : Mise à jour de l'état (`navigateTo`)

**Fichier :** `src/stores/useLabyrinthStore.ts`
**Lignes :** 222-239

```typescript
navigateTo: (page: LabyrinthPage) => {
  set((state) => {
    const newVisitedPages = new Set(state.visitedPages)
    newVisitedPages.add(page)

    // Marquer la page comme découverte
    const updatedPages = { ...state.pages }
    if (updatedPages[page]) {
      updatedPages[page] = { ...updatedPages[page], discovered: true }
    }

    return {
      currentPage: page,  // ← LE CHANGEMENT CRUCIAL
      visitedPages: newVisitedPages,
      pages: updatedPages
    }
  })
}
```

**Ce qui se passe :**
1. `set()` met à jour le store Zustand
2. On met à jour `currentPage` avec la nouvelle page
3. On ajoute la page aux pages visitées
4. On marque la page comme découverte

**Concept clé :** Zustand utilise `set()` pour mettre à jour l'état. Tous les composants qui utilisent `useLabyrinthStore()` et qui lisent `currentPage` seront automatiquement re-rendus.

---

### Étape 4 : Détection du changement (`AnimatePresence`)

**Fichier :** `src/components/LayoutLabyrinth.tsx`
**Lignes :** 219-231

```typescript
<AnimatePresence mode="wait">
  <motion.main
    key={currentPage}  // ← LA CLÉ MAGIQUE
    className="min-h-screen flex items-center justify-center p-8"
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.main>
</AnimatePresence>
```

**Ce qui se passe :**
1. `AnimatePresence` surveille les changements de `key` sur ses enfants
2. Quand `key={currentPage}` change (ex: de `'home'` à `'formation'`), Framer Motion détecte :
   - L'ancien composant doit sortir (`exit="out"`)
   - Un nouveau composant doit entrer (`initial="initial"` puis `animate="in"`)
3. Les animations sont déclenchées selon `pageVariants` :
   ```typescript
   const pageVariants = {
     initial: { opacity: 0, x: 100 },  // Nouvelle page arrive de la droite
     in: { opacity: 1, x: 0 },          // Position finale
     out: { opacity: 0, x: -100 }       // Ancienne page sort à gauche
   }
   ```

**Concept clé :** `mode="wait"` signifie que l'ancienne page doit complètement sortir avant que la nouvelle n'entre. Cela évite le chevauchement.

---

### Étape 5 : Rendu de la nouvelle page (`page.tsx`)

**Fichier :** `src/app/page.tsx`
**Lignes :** 335-366

```typescript
export default function Page() {
  const { currentPage } = useLabyrinthStore()  // ← Lecture du store

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'formation':
        return <FormationPage />
      case 'ai':
        return <AIPage />
      case 'projects':
        return <ProjectsPage />
      case 'personal':
        return <PersonalPage />
      // ... autres pages
      default:
        return <HomePage />
    }
  }

  return renderPage()
}
```

**Ce qui se passe :**
1. Le composant `Page` lit `currentPage` depuis le store Zustand
2. Quand `currentPage` change, React re-rend automatiquement le composant
3. `renderPage()` retourne le composant correspondant à la nouvelle page
4. Ce composant est rendu à l'intérieur de `<motion.main>` dans `LayoutLabyrinth`

**Concept clé :** Zustand notifie automatiquement tous les composants qui utilisent `useLabyrinthStore()`. C'est la magie du "state-driven UI" : l'UI réagit automatiquement aux changements d'état.

---

## 🎯 Concepts appris

### 1. Store global (Zustand)

**Qu'est-ce que c'est ?**
- Un store global qui contient l'état de l'application
- Accessible depuis n'importe quel composant
- Mise à jour automatique des composants qui l'utilisent

**Pourquoi l'utiliser ?**
- Évite le "prop drilling" (passer des props à travers plusieurs niveaux)
- Centralise la logique de navigation
- Persiste l'état dans le localStorage (grâce à `persist` middleware)

**Dans notre code :**
```typescript
// Création du store
export const useLabyrinthStore = create<LabyrinthState>()(
  persist(
    (set, get) => ({
      currentPage: 'home',
      navigate: (direction) => { /* ... */ },
      // ...
    }),
    { name: 'labyrinth-storage' }
  )
)

// Utilisation dans un composant
const { currentPage, navigate } = useLabyrinthStore()
```

---

### 2. State-driven UI

**Qu'est-ce que c'est ?**
- L'interface utilisateur est déterminée par l'état de l'application
- Quand l'état change, l'UI se met à jour automatiquement
- Pas besoin de manipuler le DOM directement

**Dans notre code :**
- `currentPage` dans le store → détermine quelle page afficher
- Changement de `currentPage` → React re-rend automatiquement
- Pas de `document.getElementById()` ou manipulation DOM manuelle

**Avantages :**
- Code plus prévisible
- Plus facile à déboguer
- React gère les optimisations de rendu

---

### 3. Navigation interne

**Qu'est-ce que c'est ?**
- Navigation sans changement d'URL (pas de routing Next.js classique)
- Navigation basée sur l'état, pas sur les routes
- Parfait pour une expérience "labyrinthe" où on explore

**Dans notre code :**
- Pas de `<Link>` ou `router.push()`
- Navigation purement basée sur `currentPage` dans le store
- La carte de navigation (`navigationMap`) définit les chemins possibles

**Pourquoi cette approche ?**
- Permet une navigation non-linéaire (comme un labyrinthe)
- Facilite les animations de transition
- Permet de tracker les pages visitées facilement

---

## ✅ Validation : Peux-tu expliquer à l'oral ?

**Teste-toi :** Peux-tu expliquer le flux complet sans regarder ce document ?

**Points à couvrir :**
1. ✅ Où est capturé l'événement clavier ?
2. ✅ Comment la touche est convertie en direction ?
3. ✅ Comment le store trouve la page cible ?
4. ✅ Comment `currentPage` est mis à jour ?
5. ✅ Comment React détecte le changement ?
6. ✅ Comment `AnimatePresence` gère la transition ?
7. ✅ Comment la nouvelle page est rendue ?

---

## 🔗 Architecture des fichiers

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Enveloppe tout avec LayoutLabyrinth
│   │   └── page.tsx             ← Lit currentPage et rend la bonne page
│   ├── components/
│   │   └── LayoutLabyrinth.tsx ← Gère keydown, AnimatePresence
│   └── stores/
│       └── useLabyrinthStore.ts ← Store Zustand avec navigate/navigateTo
```

**Ordre d'exécution :**
1. `layout.tsx` charge → enveloppe `page.tsx` avec `LayoutLabyrinth`
2. `LayoutLabyrinth` monte → ajoute le listener `keydown`
3. `page.tsx` monte → lit `currentPage` et rend la page initiale
4. Utilisateur appuie sur une flèche → flux complet se déclenche

---

## 🎓 Exercices pratiques

### Exercice 1 : Ajouter une nouvelle page
1. Ajoute un nouveau type dans `LabyrinthPage` (ex: `'contact'`)
2. Ajoute la page dans `navigationMap` (ex: depuis `'home'`, direction `'down'` → `'contact'`)
3. Crée le composant `ContactPage` dans `page.tsx`
4. Ajoute le case dans le `switch` de `renderPage()`

### Exercice 2 : Modifier les animations
1. Change `pageVariants` dans `LayoutLabyrinth.tsx`
2. Teste différentes animations (fade, slide, scale, etc.)

### Exercice 3 : Ajouter un raccourci clavier
1. Ajoute un nouveau mapping dans `handleKeyDown` (ex: `'h'` → retour à `'home'`)
2. Appelle `navigateTo('home')` directement

---

## 📚 Ressources pour aller plus loin

- **Zustand :** https://github.com/pmndrs/zustand
- **Framer Motion :** https://www.framer.com/motion/
- **React useEffect :** https://react.dev/reference/react/useEffect
- **State Management :** https://react.dev/learn/managing-state

---

## 🎉 Félicitations !

Tu comprends maintenant comment une simple touche déclenche tout le système de navigation. C'est la base de l'architecture du projet : **état centralisé → UI réactive → animations fluides**.
