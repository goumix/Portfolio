import { motion } from 'framer-motion'

export const AIView = () => (
  <div className="text-white space-y-8 max-w-4xl">
    <motion.h1
      className="text-5xl font-bold text-center mb-8 text-green-400"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      🤖 AI & Technology
    </motion.h1>

    <motion.div
      className="bg-black/40 p-8 rounded-lg border border-green-400/30 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-green-300">🧠 AI Integration Specialist</h2>
      <p className="text-lg text-gray-300 mb-6">
        I build AI-powered applications that actually work in production.
        No hype, just solid engineering.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-bold text-green-300">LLM Integration</h3>
          <p className="text-sm text-gray-400">RAG, Fine-tuning, API Optimization</p>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-bold text-blue-300">ML/AI Ops</h3>
          <p className="text-sm text-gray-400">Model Deployment, Monitoring, Scaling</p>
        </div>
        <div className="bg-purple-900/20 p-4 rounded-lg">
          <h3 className="font-bold text-purple-300">AI Agents</h3>
          <p className="text-sm text-gray-400">Autonomous Systems, Multi-Agent Workflows</p>
        </div>
      </div>
    </motion.div>

    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <p className="text-gray-400">
        👈 Go <strong>LEFT</strong> to chat with my AI assistant
      </p>
    </motion.div>
  </div>
)
