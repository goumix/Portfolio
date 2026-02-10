# 🗺️ Comprendre la Grille (x,y)

## Objectif pédagogique
Comprendre comment les pages sont positionnées dans une grille spatiale et comment cette représentation logique est convertie en interface utilisateur.

---

## 📋 Vue d'ensemble

```
PAGES_INFO (dans le store)
    ↓
Chaque page a position: { x: number, y: number }
    ↓
MiniMap.tsx lit ces coordonnées
    ↓
Création d'une grille 4x4
    ↓
Mapping (x,y) → Position CSS dans la grille
    ↓
Affichage visuel de la carte du labyrinthe
```

---

## 🔍 Analyse détaillée

### Étape 1 : Stockage des coordonnées (x,y)

**Fichier :** `src/stores/useLabyrinthStore.ts`
**Lignes :** 103-174

```typescript
const PAGES_INFO: Record<LabyrinthPage, PageInfo> = {
  home: {
    id: 'home',
    title: '🏠 Home',
    description: 'The center of the labyrinth',
    discovered: true,
    position: { x: 2, y: 2 }  // ← COORDONNÉES DANS LA GRILLE
  },
  formation: {
    id: 'formation',
    title: '🎓 Formation',
    description: 'Education & Skills',
    discovered: false,
    position: { x: 2, y: 1 }  // ← Au-dessus de home
  },
  ai: {
    id: 'ai',
    title: '🤖 AI',
    description: 'Artificial Intelligence',
    discovered: false,
    position: { x: 2, y: 3 }  // ← En-dessous de home
  },
  // ... autres pages
}
```

**Structure de données :**
```typescript
export interface PageInfo {
  id: LabyrinthPage
  title: string
  description: string
  discovered: boolean
  position: { x: number; y: number }  // ← Les coordonnées de la grille
}
```

**Ce qui se passe :**
- Chaque page a une propriété `position` avec `x` et `y`
- `x` = colonne (0 à 3)
- `y` = ligne (0 à 3)
- Le système de coordonnées commence en haut à gauche : `(0, 0)`

**Exemple concret :**
- `home` est à `(2, 2)` = colonne 2, ligne 2 (centre de la grille)
- `formation` est à `(2, 1)` = même colonne, ligne au-dessus
- `ai` est à `(2, 3)` = même colonne, ligne en-dessous

**Concept clé :** Les coordonnées sont stockées dans le store Zustand, accessibles via `pages[pageId].position`.

---

### Étape 2 : Visualisation de la grille

**Représentation visuelle de la grille 4x4 :**

```
     x=0    x=1    x=2    x=3
y=0  [ ]    [ ]    [ ]    [ ]
     ?      ?      🎓     🚀
           web3   Formation Advanced

y=1  [ ]    [ ]    [ ]    [ ]
     ?      💻     🏠     🎯
           Projects Home  Personal

y=2  [ ]    [ ]    [ ]    [ ]
     ?      💬     🤖     🎵
           AI Chat  AI    Music

y=3  [ ]    [ ]    [ ]    [ ]
     ?      ?      ?      ?
```

**Légende :**
- `🏠` = home (2, 2) - centre
- `🎓` = formation (2, 1) - au-dessus de home
- `🤖` = ai (2, 3) - en-dessous de home
- `💻` = projects (1, 2) - à gauche de home
- `🎯` = personal (3, 2) - à droite de home
- `?` = pages non découvertes ou cellules vides

**Système de coordonnées :**
- **x augmente** → va vers la droite
- **y augmente** → va vers le bas
- **Origine (0, 0)** → coin haut gauche

---

### Étape 3 : Conversion logique → UI (MiniMap.tsx)

**Fichier :** `src/components/MiniMap.tsx`
**Lignes :** 15-75

```typescript
const gridSize = 4 // 4x4 grid

const renderGrid = () => {
  const cells = []

  // Itérer sur toutes les cellules de la grille
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      // Trouver la page à cette position
      const pageAtPosition = Object.values(pages).find(
        page => page.position.x === x && page.position.y === y
      )

      // Rendre la cellule
      cells.push(
        <motion.div
          key={`${x}-${y}`}
          className="border border-gray-600 aspect-square ..."
        >
          {/* Contenu de la cellule */}
        </motion.div>
      )
    }
  }

  return cells
}
```

**Ce qui se passe :**

1. **Double boucle** : On itère sur toutes les combinaisons (x, y) de 0 à 3
   ```typescript
   for (let y = 0; y < 4; y++) {
     for (let x = 0; x < 4; x++) {
       // x et y définissent la position dans la grille
     }
   }
   ```

2. **Recherche de page** : Pour chaque cellule (x, y), on cherche si une page existe à cette position
   ```typescript
   const pageAtPosition = Object.values(pages).find(
     page => page.position.x === x && page.position.y === y
   )
   ```
   - Si `pageAtPosition` existe → on affiche la page
   - Si `pageAtPosition` est `undefined` → cellule vide

3. **Rendu CSS Grid** : Les cellules sont rendues dans un conteneur avec `grid-cols-4`
   ```typescript
   <div className={`grid grid-cols-${gridSize} gap-3 w-96 h-96`}>
     {renderGrid()}
   </div>
   ```
   - CSS Grid place automatiquement chaque cellule à la bonne position
   - L'ordre des cellules dans le tableau correspond à l'ordre de rendu (ligne par ligne)

**Concept clé :** Le mapping (x, y) → position UI se fait automatiquement grâce à CSS Grid. L'ordre de rendu des cellules détermine leur position visuelle.

---

### Étape 4 : Comment CSS Grid mappe les coordonnées

**Ordre de rendu des cellules :**

```typescript
// Ordre dans lequel les cellules sont créées :
cells[0]  = (0, 0)  // Première cellule, première ligne
cells[1]  = (1, 0)  // Deuxième cellule, première ligne
cells[2]  = (2, 0)  // Troisième cellule, première ligne
cells[3]  = (3, 0)  // Quatrième cellule, première ligne
cells[4]  = (0, 1)  // Première cellule, deuxième ligne
cells[5]  = (1, 1)  // Deuxième cellule, deuxième ligne
// ... etc
```

**CSS Grid place automatiquement :**

```
grid-cols-4 crée 4 colonnes :

[cell 0]  [cell 1]  [cell 2]  [cell 3]   ← Ligne 0 (y=0)
[cell 4]  [cell 5]  [cell 6]  [cell 7]   ← Ligne 1 (y=1)
[cell 8]  [cell 9]  [cell 10] [cell 11]  ← Ligne 2 (y=2)
[cell 12] [cell 13] [cell 14] [cell 15]  ← Ligne 3 (y=3)
```

**Formule de mapping :**
- Position dans le tableau = `y * gridSize + x`
- Exemple : `(2, 1)` → index `1 * 4 + 2 = 6` (7ème cellule)

**Concept clé :** CSS Grid place les éléments dans l'ordre où ils apparaissent dans le DOM. Notre double boucle garantit que l'ordre correspond à la grille (ligne par ligne, de gauche à droite).

---

## 🎯 Concepts appris

### 1. Représentation spatiale (grid)

**Qu'est-ce que c'est ?**
- Un système de coordonnées 2D pour organiser les pages dans l'espace
- Chaque page a une position unique (x, y) dans une grille
- Permet de visualiser les relations spatiales entre les pages

**Pourquoi l'utiliser ?**
- **Visualisation** : La minimap montre où on se trouve dans le labyrinthe
- **Navigation** : On peut cliquer sur une cellule pour naviguer
- **Découverte** : On voit quelles zones sont découvertes vs inconnues
- **Relation logique** : Les coordonnées reflètent la structure du labyrinthe

**Dans notre code :**
```typescript
// Structure logique
home: { x: 2, y: 2 }        // Centre
formation: { x: 2, y: 1 }    // Au-dessus
ai: { x: 2, y: 3 }           // En-dessous
projects: { x: 1, y: 2 }     // À gauche
personal: { x: 3, y: 2 }     // À droite
```

**Avantages :**
- Facile à comprendre et visualiser
- Permet de calculer des distances ou chemins
- Extensible (on peut ajouter des pages facilement)

---

### 2. Mapping logique ↔ UI

**Qu'est-ce que c'est ?**
- Conversion des coordonnées logiques (x, y) en position visuelle dans l'interface
- Le mapping se fait via l'ordre de rendu + CSS Grid

**Comment ça marche :**

1. **Données logiques** : `position: { x: 2, y: 2 }`
2. **Algorithme de rendu** : Double boucle qui crée les cellules dans l'ordre
3. **CSS Grid** : Place automatiquement les cellules aux bonnes positions
4. **Résultat visuel** : La page apparaît à la bonne position dans la grille

**Dans notre code :**
```typescript
// 1. Données logiques (dans le store)
pages.home.position = { x: 2, y: 2 }

// 2. Algorithme de rendu
for (let y = 0; y < 4; y++) {
  for (let x = 0; x < 4; x++) {
    // Quand x=2 et y=2, on trouve home
    const page = findPageAt(x, y)
  }
}

// 3. CSS Grid place automatiquement
<div className="grid grid-cols-4">
  {cells}  // Ordre = position visuelle
</div>
```

**Concept clé :** On ne manipule pas directement les positions CSS. On crée les cellules dans le bon ordre, et CSS Grid fait le placement automatiquement.

---

## 📊 Structure complète de la grille

### Toutes les positions

```
Grille 4x4 avec toutes les pages :

     x=0      x=1          x=2            x=3
y=0  [404]    [vide]       [vide]         [vide]
     ❌       ?            ?              ?
     Lost

y=1  [vide]   [web3]       [formation]    [advanced]
     ?        ⛓️           🎓             🚀
              Web3         Formation      Advanced
              Projects                    Skills

y=2  [vide]   [projects]   [HOME]         [personal]
     ?        💻          🏠             🎯
              Projects    HOME            Personal
              & Work      (centre)        & About

y=3  [vide]   [ai-chat]    [ai]           [music]
     ?        💬          🤖             🎵
              AI Chat     AI &            My Music
                          Technology
```

### Coordonnées détaillées

| Page | x | y | Description |
|------|---|---|-------------|
| `404` | 0 | 0 | Page secrète (easter egg) |
| `projects-web3` | 1 | 1 | Projets Web3 |
| `formation` | 2 | 1 | Formation & Skills |
| `formation-advanced` | 3 | 1 | Compétences avancées |
| `projects` | 1 | 2 | Projets & Travail |
| `home` | 2 | 2 | **Centre du labyrinthe** |
| `personal` | 3 | 2 | Personnel & À propos |
| `ai-chat` | 1 | 3 | Chat avec l'IA |
| `ai` | 2 | 3 | IA & Technologie |
| `personal-music` | 3 | 3 | Ma musique |

**Note :** Les cellules vides (x, y) n'ont pas de page associée.

---

## 🔍 Détails techniques

### Comment trouver une page à une position

```typescript
// Dans MiniMap.tsx, ligne 24-26
const pageAtPosition = Object.values(pages).find(
  page => page.position.x === x && page.position.y === y
)
```

**Explication :**
1. `Object.values(pages)` → Convertit l'objet en tableau de pages
2. `.find()` → Cherche la première page qui correspond
3. Condition : `page.position.x === x && page.position.y === y`
4. Retourne la page si trouvée, `undefined` sinon

**Exemple :**
- On cherche à la position `(2, 2)`
- On trouve `pages.home` car `home.position = { x: 2, y: 2 }`
- On affiche la cellule avec les infos de `home`

---

### États visuels des cellules

```typescript
// Lignes 36-43 de MiniMap.tsx
className={`
  ${pageAtPosition
    ? isDiscovered
      ? 'bg-blue-600/80'      // ← Page découverte
      : 'bg-gray-700/50'       // ← Page non découverte
    : 'bg-gray-900/30'         // ← Cellule vide
  }
  ${isCurrentPage ? 'ring-2 ring-yellow-400' : ''}  // ← Page actuelle
`}
```

**États possibles :**
1. **Cellule vide** : Pas de page à cette position → fond gris foncé
2. **Page non découverte** : Page existe mais pas encore visitée → fond gris moyen + "?"
3. **Page découverte** : Page visitée → fond bleu + titre visible
4. **Page actuelle** : Page où on se trouve → anneau jaune + animation

---

## ✅ Validation : Dessiner la grille sur papier

**Exercice pratique :**

1. **Dessine une grille 4x4** sur papier
2. **Place chaque page** aux bonnes coordonnées (x, y)
3. **Marque le centre** (home à 2, 2)
4. **Trace les connexions** selon `navigationMap` :
   - De `home` (2, 2) vers `formation` (2, 1) = flèche vers le haut
   - De `home` (2, 2) vers `ai` (2, 3) = flèche vers le bas
   - De `home` (2, 2) vers `projects` (1, 2) = flèche vers la gauche
   - De `home` (2, 2) vers `personal` (3, 2) = flèche vers la droite

**Vérification :**
- ✅ Peux-tu identifier où se trouve chaque page ?
- ✅ Comprends-tu pourquoi `home` est au centre ?
- ✅ Peux-tu expliquer comment (x, y) devient une position visuelle ?

---

## 🎓 Exercices pratiques

### Exercice 1 : Ajouter une nouvelle page à la grille

1. Choisis une position libre (ex: `x: 0, y: 3`)
2. Ajoute la page dans `PAGES_INFO` avec cette position
3. Vérifie qu'elle apparaît dans la minimap

**Code à modifier :**
```typescript
// Dans useLabyrinthStore.ts
const PAGES_INFO: Record<LabyrinthPage, PageInfo> = {
  // ... pages existantes
  'nouvelle-page': {
    id: 'nouvelle-page',
    title: '🆕 Nouvelle Page',
    description: 'Test',
    discovered: false,
    position: { x: 0, y: 3 }  // ← Nouvelle position
  }
}
```

---

### Exercice 2 : Modifier la taille de la grille

1. Change `gridSize` de 4 à 5 dans `MiniMap.tsx`
2. Ajuste les positions des pages pour une grille 5x5
3. Observe comment la minimap s'adapte

**Code à modifier :**
```typescript
// Dans MiniMap.tsx
const gridSize = 5 // Au lieu de 4
```

---

### Exercice 3 : Calculer la distance entre deux pages

Crée une fonction qui calcule la distance Manhattan entre deux pages :

```typescript
function distanceManhattan(page1: PageInfo, page2: PageInfo): number {
  return Math.abs(page1.position.x - page2.position.x) +
         Math.abs(page1.position.y - page2.position.y)
}

// Exemple : distance entre home (2,2) et formation (2,1)
// = |2-2| + |2-1| = 0 + 1 = 1
```

---

## 🔗 Relation avec la navigation

**Comment la grille se connecte à la navigation :**

1. **Navigation directionnelle** : Les flèches (up/down/left/right) correspondent aux directions dans la grille
   - `up` → y diminue (monte dans la grille)
   - `down` → y augmente (descend dans la grille)
   - `left` → x diminue (va à gauche)
   - `right` → x augmente (va à droite)

2. **Cohérence spatiale** : Le `navigationMap` devrait refléter les positions dans la grille
   - `home` (2, 2) → `up` → `formation` (2, 1) ✅ Cohérent (y diminue)
   - `home` (2, 2) → `down` → `ai` (2, 3) ✅ Cohérent (y augmente)
   - `home` (2, 2) → `left` → `projects` (1, 2) ✅ Cohérent (x diminue)
   - `home` (2, 2) → `right` → `personal` (3, 2) ✅ Cohérent (x augmente)

3. **Visualisation** : La minimap montre visuellement où on peut naviguer

---

## 📚 Résumé des concepts clés

| Concept | Description | Exemple |
|---------|-------------|---------|
| **Coordonnées (x, y)** | Position logique dans la grille | `{ x: 2, y: 1 }` |
| **Grid 4x4** | Grille de 4 colonnes × 4 lignes | 16 cellules au total |
| **Mapping logique → UI** | Conversion via ordre de rendu + CSS Grid | Double boucle → CSS Grid |
| **PageInfo.position** | Stockage des coordonnées dans le store | `pages.home.position` |
| **Recherche de page** | Trouver une page à une position (x, y) | `find(page => page.position.x === x)` |

---

## 🎉 Félicitations !

Tu comprends maintenant :
- ✅ Comment les coordonnées (x, y) sont stockées dans `PAGES_INFO`
- ✅ Comment `MiniMap.tsx` utilise ces coordonnées pour créer la grille
- ✅ Le mapping entre représentation logique et interface utilisateur
- ✅ Comment dessiner la grille sur papier

**Prochaine étape :** Tu peux maintenant expliquer comment la minimap fonctionne et comment ajouter de nouvelles pages à la grille !
