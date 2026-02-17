import { motion } from 'framer-motion'

export const NotFoundPage = () => (
  <div className="text-white space-y-8 max-w-4xl text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-8xl mb-8">❌</div>
      <h1 className="text-5xl font-bold mb-4 text-red-400">
        You&apos;re Lost!
      </h1>
      <p className="text-2xl text-gray-300 mb-8">
        But that&apos;s okay... you found a secret! 🎉
      </p>
    </motion.div>

    <motion.div
      className="bg-red-900/20 p-8 rounded-lg border border-red-400/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-red-300 mb-4">🔍 Bug Hunter NFT Unlocked!</h2>
      <p className="text-lg text-gray-300">
        Congratulations! You tried to navigate in a direction that doesn&apos;t exist.
        This exploration spirit has earned you a special NFT.
      </p>
    </motion.div>

    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <p className="text-gray-400">
        Use arrow keys to navigate back to known territory
      </p>
    </motion.div>
  </div>
)

