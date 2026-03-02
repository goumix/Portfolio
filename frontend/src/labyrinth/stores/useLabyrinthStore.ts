import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LabyrinthPage =
  | 'home'
  | 'formation'
  | 'projects'
  | 'blockchain'
  | 'entrepreneurship'
  | 'personal-projects'
  | 'personal'
  | 'health'
  | 'music'
  | 'games'
  | 'literature'
  | 'ai'
  | '404'

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface PageInfo {
  id: LabyrinthPage
  title: string
  description: string
  discovered: boolean
  position: { x: number; y: number } // Grid coordinates for minimap
}

export type NavigationMap = {
  [key in LabyrinthPage]?: Partial<Record<Direction, LabyrinthPage>>
}

// export interface EasterEgg {
//   id: string
//   name: string
//   description: string
//   unlocked: boolean
//   tokenId?: number
// }

interface LabyrinthState {
  // Navigation state
  currentPage: LabyrinthPage
  visitedPages: Set<LabyrinthPage>

  // Mini-map state
  isMinimapFullscreen: boolean

  // Easter eggs
  // easterEggs: EasterEgg[]

  // Pages info for minimap
  pages: Record<LabyrinthPage, PageInfo>

  // Navigation map - defines which direction leads where from each page
  navigationMap: NavigationMap

  // Actions
  navigateTo: (page: LabyrinthPage) => void
  navigate: (direction: Direction) => void
  toggleMinimap: () => void
  discoverPage: (page: LabyrinthPage) => void
  // unlockEasterEgg: (eggId: string, tokenId?: number) => void
  resetProgress: () => void
}

// Define the navigation map structure
const NAVIGATION_MAP: NavigationMap = {
  home: {
    up: 'formation',
    down: 'ai',
    left: 'projects',
    right: 'personal'
  },
  formation: {
    down: 'home',
  },
  projects: {
    up: 'blockchain',
    down: 'personal-projects',
    right: 'home',
    left: 'entrepreneurship',
  },
  blockchain: {
    down: 'projects',
  },
  entrepreneurship: {
    right: 'projects',
  },
  'personal-projects': {
    up: 'projects',
  },
  personal: {
    up: 'music',
    down: 'health',
    right: 'games',
    left: 'home',
  },
  health: {
    up: 'personal',
  },
  music: {
    down: 'personal'
  },
  literature: {
    left: 'games',
  },
  games: {
    left: 'personal',
    right: 'literature',
  },
  ai: {
    up: 'home',
  },
}

// Define page positions for minimap (grid coordinates)
const PAGES_INFO: Record<LabyrinthPage, PageInfo> = {
  home: {
    id: 'home',
    title: '🏠 Home',
    description: 'The center of the labyrinth',
    discovered: true,
    position: { x: 4, y: 4 }
  },
  formation: {
    id: 'formation',
    title: '🎓 Formation',
    description: 'Education & Skills',
    discovered: false,
    position: { x: 4, y: 3 }
  },
  projects: {
    id: 'projects',
    title: '💻 Projects',
    description: 'My Work',
    discovered: false,
    position: { x: 3, y: 4 }
  },
  blockchain: {
    id: 'blockchain',
    title: '💰 Blockchain',
    description: 'My blockchain',
    discovered: false,
    position: { x: 3, y: 3 }
  },
  entrepreneurship: {
    id: 'entrepreneurship',
    title: '💼 Entrepreneurship',
    description: 'My entrepreneurship',
    discovered: false,
    position: { x: 2, y: 4 }
  },
  'personal-projects': {
    id: 'personal-projects',
    title: '💻 Personal Projects',
    description: 'My personal projects',
    discovered: false,
    position: { x: 3, y: 5 }
  },
  personal: {
    id: 'personal',
    title: '🎯 Personal',
    description: 'About Me',
    discovered: false,
    position: { x: 5, y: 4 }
  },
  health: {
    id: 'health',
    title: '🧘 Health',
    description: 'My health',
    discovered: false,
    position: { x: 5, y: 5 }
  },
  music: {
    id: 'music',
    title: '🎵 Music',
    description: 'My soundtrack',
    discovered: false,
    position: { x: 5, y: 3 }
  },
  games: {
    id: 'games',
    title: '🎮 Games',
    description: 'My games',
    discovered: false,
    position: { x: 6, y: 4 }
  },
  literature: {
    id: 'literature',
    title: '📚 Literature',
    description: 'My literature',
    discovered: false,
    position: { x: 7, y: 4 }
  },
  ai: {
    id: 'ai',
    title: '🤖 AI',
    description: 'Artificial Intelligence',
    discovered: false,
    position: { x: 4, y: 5 }
  },
  '404': {
    id: '404',
    title: '❌ Lost',
    description: 'You found a secret!',
    discovered: false,
    position: { x: 0, y: 0 }
  }
}

// Initial easter eggs
// const INITIAL_EASTER_EGGS: EasterEgg[] = [
//   {
//     id: 'ai-talker',
//     name: '🗣️ AI Whisperer',
//     description: 'Had a conversation with the AI',
//     unlocked: false
//   },
//   {
//     id: 'music-lover',
//     name: '🎧 Music Lover',
//     description: 'Listened to all songs',
//     unlocked: false
//   },
//   {
//     id: 'explorer',
//     name: '🧭 Explorer',
//     description: 'Fully explored the labyrinth',
//     unlocked: false
//   },
//   {
//     id: '404-finder',
//     name: '🔍 Bug Hunter',
//     description: 'Found the 404 page',
//     unlocked: false
//   },
//   {
//     id: 'console-hacker',
//     name: '💻 Console Hacker',
//     description: 'Found the hidden console message',
//     unlocked: false
//   }
// ]

export const useLabyrinthStore = create<LabyrinthState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentPage: 'home',
      visitedPages: new Set(['home']),
      isMinimapFullscreen: false,
      // easterEggs: INITIAL_EASTER_EGGS,
      pages: PAGES_INFO,
      navigationMap: NAVIGATION_MAP,

      // Actions
      navigateTo: (page: LabyrinthPage) => {
        set((state) => {
          const newVisitedPages = new Set(state.visitedPages)
          newVisitedPages.add(page)

          // Update page discovery
          const updatedPages = { ...state.pages }
          if (updatedPages[page]) {
            updatedPages[page] = { ...updatedPages[page], discovered: true }
          }

          return {
            currentPage: page,
            visitedPages: newVisitedPages,
            pages: updatedPages
          }
        })
      },

            navigate: (direction: Direction) => {
        const { currentPage, navigationMap } = get()
        const currentPageMap = navigationMap[currentPage]
        const targetPage = currentPageMap?.[direction]

        if (targetPage) {
          get().navigateTo(targetPage)
        } else {
          // Navigate to 404 for invalid directions
          get().navigateTo('404')
          // get().unlockEasterEgg('404-finder')
        }
      },

      toggleMinimap: () => {
        set((state) => ({
          isMinimapFullscreen: !state.isMinimapFullscreen
        }))
      },

      discoverPage: (page: LabyrinthPage) => {
        set((state) => ({
          pages: {
            ...state.pages,
            [page]: {
              ...state.pages[page],
              discovered: true
            }
          }
        }))
      },

      // unlockEasterEgg: (eggId: string, tokenId?: number) => {
      //   set((state) => ({
      //     easterEggs: state.easterEggs.map(egg =>
      //       egg.id === eggId
      //         ? { ...egg, unlocked: true, tokenId }
      //         : egg
      //     )
      //   }))
      // },

      resetProgress: () => {
        set({
          currentPage: 'home',
          visitedPages: new Set(['home']),
          isMinimapFullscreen: false,
          // easterEggs: INITIAL_EASTER_EGGS,
          pages: PAGES_INFO
        })
      }
    }),
    {
      name: 'labyrinth-storage',
      partialize: (state) => ({
        ...state,
        visitedPages: Array.from(state.visitedPages)
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const visitedArray = Array.isArray(state.visitedPages)
            ? state.visitedPages
            : ['home']
          state.visitedPages = new Set(visitedArray as LabyrinthPage[])
        }
      }
    }
  )
)
