import { motion } from 'framer-motion'

export const ProjectsPage = () => (
  <div className="text-white space-y-8 max-w-4xl">
    <motion.h1
      className="text-5xl font-bold text-center mb-8 text-yellow-400"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      💻 Projects & Work
    </motion.h1>

    <div className="space-y-6">
      <motion.div
        className="bg-black/40 p-6 rounded-lg border border-yellow-400/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-3 text-yellow-300">🏗️ Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="font-bold text-yellow-200">DeFi Yield Aggregator</h3>
            <p className="text-sm text-gray-400">Cross-chain yield farming optimization platform</p>
            <div className="mt-2 text-xs">
              <span className="bg-yellow-600/20 px-2 py-1 rounded mr-2">Solidity</span>
              <span className="bg-blue-600/20 px-2 py-1 rounded mr-2">React</span>
              <span className="bg-purple-600/20 px-2 py-1 rounded">Web3</span>
            </div>
          </div>
          <div className="bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-bold text-blue-200">AI-Powered Trading Bot</h3>
            <p className="text-sm text-gray-400">Algorithmic trading with ML predictions</p>
            <div className="mt-2 text-xs">
              <span className="bg-green-600/20 px-2 py-1 rounded mr-2">Python</span>
              <span className="bg-yellow-600/20 px-2 py-1 rounded mr-2">TensorFlow</span>
              <span className="bg-red-600/20 px-2 py-1 rounded">APIs</span>
            </div>
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
          ⬆️ Go <strong>UP</strong> to explore Web3 projects
        </p>
      </motion.div>
    </div>
  </div>
)

