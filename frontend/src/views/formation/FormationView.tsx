import { motion } from 'framer-motion'

export const FormationView = () => (
  <div className="text-white space-y-8 max-w-4xl">
    <motion.h1
      className="text-5xl font-bold text-center mb-8 text-blue-400"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      🎓 Formation & Skills
    </motion.h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        className="bg-black/40 p-6 rounded-lg border border-blue-400/30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-300">🎯 Web3 & Blockchain</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• Solidity Smart Contracts</li>
          <li>• DeFi Protocol Development</li>
          <li>• NFT & Token Standards</li>
          <li>• Layer 2 Solutions</li>
          <li>• Cross-chain Integration</li>
        </ul>
      </motion.div>

      <motion.div
        className="bg-black/40 p-6 rounded-lg border border-purple-400/30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-300">💻 Full-Stack Development</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• React, Next.js, TypeScript</li>
          <li>• Node.js, Python, Rust</li>
          <li>• PostgreSQL, MongoDB</li>
          <li>• AWS, Docker, Kubernetes</li>
          <li>• GraphQL, REST APIs</li>
        </ul>
      </motion.div>
    </div>

    <motion.div
      className="text-center mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <p className="text-gray-400">
        👉 Go <strong>RIGHT</strong> to explore advanced skills
      </p>
    </motion.div>
  </div>
)
