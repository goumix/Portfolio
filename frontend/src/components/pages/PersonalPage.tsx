import { motion } from 'framer-motion'

export const PersonalPage = () => (
  <div className="text-white space-y-8 max-w-4xl">
    <motion.h1
      className="text-5xl font-bold text-center mb-8 text-pink-400"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      🎯 Personal & About
    </motion.h1>

    <motion.div
      className="bg-black/40 p-8 rounded-lg border border-pink-400/30"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-3xl font-bold text-pink-300">Natheo Brault</h2>
        <p className="text-lg text-gray-300">Senior Full-Stack Web3 Developer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-xl font-bold text-pink-300 mb-3">🎨 Philosophy</h3>
          <p className="text-gray-300">
            I believe in building weird, creative, and functional things.
            This portfolio is intentionally non-professional because
            personality matters more than perfect responsive design.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-pink-300 mb-3">🎮 Interests</h3>
          <ul className="text-gray-300 space-y-1">
            <li>🎵 Music Production</li>
            <li>🎨 Digital Art & NFTs</li>
            <li>🧩 Puzzle Games</li>
            <li>📚 Sci-Fi Literature</li>
            <li>☕ Coffee Appreciation</li>
          </ul>
        </div>
      </div>
    </motion.div>

    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <p className="text-gray-400">
        ⬇️ Go <strong>DOWN</strong> to listen to my music
      </p>
    </motion.div>
  </div>
)

