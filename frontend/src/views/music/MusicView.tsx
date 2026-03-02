import { motion } from "framer-motion"

export const MusicView = () => (
    <div className="text-white space-y-8 max-w-4xl">
    <motion.h1
      className="text-5xl font-bold text-center mb-8 text-pink-400"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      🎵 My Music
    </motion.h1>
    <motion.div
      className="bg-black/40 p-8 rounded-lg border border-pink-400/30"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <p className="text-gray-300">More content coming soon... 🚧</p>
    </motion.div>
  </div>
)
