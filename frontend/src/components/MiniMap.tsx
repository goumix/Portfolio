'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLabyrinthStore, type LabyrinthPage } from '@/stores/useLabyrinthStore'

export const MiniMap = () => {
  const {
    pages,
    currentPage,
    navigationMap,
    isMinimapFullscreen,
    toggleMinimap,
    navigateTo
  } = useLabyrinthStore()

  const gridSize = 4 // 4x4 grid for fullscreen map

  const renderPageCell = (pageId: LabyrinthPage | null, key: string, variant: 'mini' | 'full') => {
    const pageInfo = pageId ? pages[pageId] : undefined
    const isCurrentPage = pageInfo?.id === currentPage
    const isDiscovered = pageInfo?.discovered || false

    return (
      <motion.div
        key={key}
        className={`
          border border-gray-600 aspect-square flex items-center justify-center text-xs relative
          ${pageInfo
            ? isDiscovered
              ? 'bg-blue-600/80'
              : 'bg-gray-700/50'
            : 'bg-gray-900/30'
          }
          ${isCurrentPage ? 'ring-2 ring-yellow-400 ring-opacity-80' : ''}
          ${pageInfo && isDiscovered ? 'cursor-pointer hover:bg-blue-500/80' : ''}
        `}
        onClick={() => {
          if (pageInfo && isDiscovered) {
            navigateTo(pageInfo.id)
          }
        }}
        whileHover={pageInfo && isDiscovered && variant === 'full' ? { scale: 1.05 } : {}}
        transition={{ duration: 0.2 }}
      >
        {pageInfo && isDiscovered && (
          <div className={`text-center ${variant === 'mini' ? 'leading-none' : ''}`}>
            <div className={variant === 'mini' ? 'text-sm' : 'text-xl mb-1'}>
              {pageInfo.title.split(' ')[0]}
            </div>
            {isCurrentPage && (
              <motion.div
                className="absolute inset-0 bg-yellow-400/20 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        )}
        {pageInfo && !isDiscovered && (
          <div className="text-gray-500">?</div>
        )}
      </motion.div>
    )
  }

  // Helper to render a single cell at a given position
  const renderCell = (x: number, y: number) => {
    const pageAtPosition = Object.values(pages).find(
      page => page.position.x === x && page.position.y === y
    )

    const isCurrentPage = pageAtPosition?.id === currentPage
    const isDiscovered = pageAtPosition?.discovered || false

    return (
      <motion.div
        key={`${x}-${y}`}
        className={`
          border border-gray-600 aspect-square flex items-center justify-center text-xs relative
          ${pageAtPosition
            ? isDiscovered
              ? 'bg-blue-600/80'
              : 'bg-gray-700/50'
            : 'bg-gray-900/30'
          }
          ${isCurrentPage ? 'ring-2 ring-yellow-400 ring-opacity-80' : ''}
          ${pageAtPosition && isDiscovered ? 'cursor-pointer hover:bg-blue-500/80' : ''}
        `}
        onClick={() => {
          if (pageAtPosition && isDiscovered) {
            navigateTo(pageAtPosition.id)
          }
        }}
        whileHover={pageAtPosition && isDiscovered ? { scale: 1.05 } : {}}
        transition={{ duration: 0.2 }}
      >
        {pageAtPosition && isDiscovered && (
          <div className="text-center">
            <div className="text-xl mb-1">{pageAtPosition.title.split(' ')[0]}</div>
            {isCurrentPage && (
              <motion.div
                className="absolute inset-0 bg-yellow-400/20 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        )}
        {pageAtPosition && !isDiscovered && (
          <div className="text-gray-500">?</div>
        )}
      </motion.div>
    )
  }

  // Create global 4x4 grid (used for fullscreen map)
  const renderGlobalGrid = () => {
    const cells = []

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        cells.push(renderCell(x, y))
      }
    }

    return cells
  }

  // Create local grid centered on current page (used for mini map)
  const renderLocalGrid = () => {
    const neighbors = navigationMap[currentPage] || {}

    const localCells: Array<LabyrinthPage | null> = [
      null, neighbors.up ?? null, null,
      neighbors.left ?? null, currentPage, neighbors.right ?? null,
      null, neighbors.down ?? null, null
    ]

    return localCells.map((pageId, idx) => renderPageCell(pageId, `local-${idx}`, 'mini'))
  }

  // Mini version (top-right corner)
  const MiniVersion = () => (
    <motion.div
      className="fixed top-8 right-8 z-20 bg-black/80 border border-white/20 rounded-lg p-2 cursor-pointer hover:bg-black/90 transition-colors"
      onClick={toggleMinimap}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="text-white text-xs mb-1 text-center">Map (M)</div>
      <div className="grid grid-cols-3 gap-1 w-16 h-16">
        {renderLocalGrid()}
      </div>
    </motion.div>
  )

  // Fullscreen version
  const FullscreenVersion = () => (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={toggleMinimap}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <motion.h2
          className="text-white text-3xl font-bold mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🗺️ Labyrinth Map
        </motion.h2>

        <motion.div
        className="grid grid-cols-4 gap-3 w-96 h-96 mx-auto mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
        {renderGlobalGrid()}
        </motion.div>

        <motion.div
          className="text-white/80 space-y-2 text-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div>🔵 Discovered areas • ⚫ Unknown areas</div>
          <div>🟡 Your current location</div>
          <div>Click discovered areas to travel there</div>
          <div className="mt-4 text-xs opacity-60">
            Press <kbd className="bg-white/20 px-2 py-1 rounded">M</kbd> or click anywhere to close
          </div>
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <AnimatePresence mode="wait">
      {isMinimapFullscreen ? (
        <FullscreenVersion key="fullscreen" />
      ) : (
        <MiniVersion key="mini" />
      )}
    </AnimatePresence>
  )
}
