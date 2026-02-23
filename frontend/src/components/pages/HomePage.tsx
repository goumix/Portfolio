import { motion } from 'framer-motion'

export const HomePage = () => (
  <div className="text-center text-white space-y-8 h-screen w-full flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Welcome to the Labyrinth
      </h1>
      <p className="text-2xl text-gray-300 mb-8">
        Natheo&apos;s Intentionally Weird Portfolio
      </p>
    </motion.div>

    {/* <motion.div
      className="grid grid-cols-2 gap-8 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className="text-left space-y-4">
        <h2 className="text-2xl font-bold text-yellow-400">🎮 How to Navigate</h2>
        <ul className="space-y-2 text-gray-300">
          <li>⬆️ <strong>UP</strong> → Formation & Skills</li>
          <li>⬇️ <strong>DOWN</strong> → AI & Technology</li>
          <li>⬅️ <strong>LEFT</strong> → Projects & Work</li>
          <li>➡️ <strong>RIGHT</strong> → Personal & About</li>
        </ul>
      </div>

      <div className="text-left space-y-4">
        <h2 className="text-2xl font-bold text-green-400">🥚 Easter Eggs</h2>
        <ul className="space-y-2 text-gray-300">
          <li>🗣️ Talk to the AI</li>
          <li>🎵 Listen to all songs</li>
          <li>🧭 Explore every corner</li>
          <li>💻 Check the console</li>
          <li>🔍 Find hidden paths</li>
        </ul>
      </div>
    </motion.div> */}
{/*
    <motion.div
      className="mt-12 p-6 bg-black/40 rounded-lg border border-white/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.4 }}
    >
      <p className="text-lg text-gray-300">
        Each easter egg you find becomes a <span className="text-purple-400 font-bold">soulbound NFT</span>.
        <br />
        Collect them all to unlock the ultimate prize! 🏆
      </p>
    </motion.div> */}
  </div>
)
