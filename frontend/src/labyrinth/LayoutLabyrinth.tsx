'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLabyrinthStore, type Direction } from '@/labyrinth/stores/useLabyrinthStore'
import { MiniMap } from './MiniMap'

interface LayoutLabyrinthProps {
  children: React.ReactNode
}

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Direction arrows component
const DirectionArrow = ({
  direction,
  available,
  onClick
}: {
  direction: Direction
  available: boolean
  onClick: () => void
}) => {
  const arrows = {
    up: '↑',
    down: '↓',
    left: '←',
    right: '→'
  }

  const positions = {
    up: 'top-4 left-1/2 -translate-x-1/2',
    down: 'bottom-4 left-1/2 -translate-x-1/2',
    left: 'left-4 top-1/2 -translate-y-1/2',
    right: 'right-4 top-1/2 -translate-y-1/2'
  }

  if (!available) return null

  return (
    <motion.button
      className={`fixed ${positions[direction]} z-30 bg-black/80 text-white text-4xl p-4 rounded-full hover:bg-black/90 transition-all duration-300 hover:scale-110 font-mono border-2 border-white/20`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      {arrows[direction]}
    </motion.button>
  )
}

// Mobile alert component
const MobileAlert = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center text-white z-50 p-8">
    <div className="text-center space-y-4 max-w-md">
      <div className="text-6xl mb-8">📱</div>
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="text-lg">
        This website is intentionally non-responsive.
      </p>
      <p className="text-sm opacity-80">
        I could make it mobile-friendly, but I&apos;m lazy 🤷‍♂️
      </p>
      <p className="text-sm mt-8">
        Please visit on a desktop or laptop for the full experience!
      </p>
      <div className="mt-8 text-xs opacity-60">
        (This is part of the artistic vision, I promise)
      </div>
    </div>
  </div>
)

// Console easter egg
// const useConsoleEasterEgg = () => {
//   const { unlockEasterEgg } = useLabyrinthStore()

//   useEffect(() => {
//     const styles = [
//       'background: linear-gradient(45deg, #ff6b6b, #4ecdc4)',
//       'color: white',
//       'font-size: 16px',
//       'padding: 10px 20px',
//       'border-radius: 10px',
//       'font-weight: bold'
//     ].join(';')

//     console.log('%c🎉 SECRET DISCOVERED! 🎉', styles)
//     console.log('You found the hidden console message! This unlocks a special NFT.')
//     console.log('Keep exploring the labyrinth for more easter eggs...')

//     // Unlock the console hacker easter egg
//     unlockEasterEgg('console-hacker')
//   }, [unlockEasterEgg])
// }

export const LayoutLabyrinth = ({ children }: LayoutLabyrinthProps) => {
  // Call all hooks first
  const isMobile = useIsMobile()
  const {
    currentPage,
    navigationMap,
    navigate,
    isMinimapFullscreen,
    toggleMinimap,
    pages,
    // easterEggs
  } = useLabyrinthStore()

  // Add console easter egg
  // useConsoleEasterEgg()

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle minimap with 'M' key
      if (event.key.toLowerCase() === 'm') {
        event.preventDefault()
        toggleMinimap()
        return
      }

      // Directional navigation
      const keyToDirection: Record<string, Direction> = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
      }

      const direction = keyToDirection[event.key]
      if (direction) {
        event.preventDefault()
        navigate(direction)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate, toggleMinimap])

  // Get available directions for current page
  const availableDirections = navigationMap[currentPage] || {}

  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  }

  const pageTransition = {
    type: 'tween' as const,
    ease: 'anticipate' as const,
    duration: 0.5
  }

  // Early return after all hooks are called
  if (isMobile) {
    return <MobileAlert />
  }

  return (
    <div className="min-h-screen min-w-screen bg-black relative overflow-hidden">
      {/* Minimap */}
      <MiniMap />

      {/* Direction arrows */}
      {Object.entries(availableDirections).map(([direction, targetPage]) => (
        <DirectionArrow
          key={direction}
          direction={direction as Direction}
          available={!!targetPage}
          onClick={() => navigate(direction as Direction)}
        />
      ))}

      {/* Current page indicator */}
      <motion.div
        className="fixed top-8 left-8 z-20 bg-black/60 text-white px-4 py-2 rounded-lg border border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-sm opacity-80">Current Location:</div>
        <div className="font-bold text-lg">{pages[currentPage]?.title}</div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="fixed bottom-8 left-8 z-20 bg-black/60 text-white px-4 py-3 rounded-lg border border-white/20 text-sm space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div>🏠 Use arrow keys to navigate</div>
        <div>🗺️ Press <kbd className="bg-white/20 px-1 rounded">M</kbd> for map</div>
        {/* <div>🥚 Explore to find easter eggs</div> */}
      </motion.div>

      {/* Main content area */}
      <div
          key={currentPage}
          className="min-h-screen min-w-screen flex items-center justify-center"
        >
          {children}
        </div>

      {/* Easter egg indicator */}
      {/* <motion.div
        className="fixed bottom-8 right-8 z-20 bg-black/60 text-white px-4 py-2 rounded-lg border border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-sm opacity-80">Easter Eggs:</div>
        <div className="font-bold text-lg">
          {easterEggs.filter(egg => egg.unlocked).length} / {easterEggs.length}
        </div>
      </motion.div> */}

      {/* Ambient particles effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
