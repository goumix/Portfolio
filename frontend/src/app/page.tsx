'use client'

import { motion } from 'framer-motion'
import { useLabyrinthStore } from '@/stores/useLabyrinthStore'

// Individual page components
const HomePage = () => (
  <div className="text-center text-white space-y-8 max-w-4xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Welcome to the Labyrinth
      </h1>
      <p className="text-2xl text-gray-300 mb-8">
        Nathan&apos;s Intentionally Weird Portfolio
      </p>
    </motion.div>

    <motion.div
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
    </motion.div>

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
    </motion.div>
  </div>
)

const FormationPage = () => (
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

const AIPage = () => (
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

const ProjectsPage = () => (
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

const PersonalPage = () => (
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
        <h2 className="text-3xl font-bold text-pink-300">Nathan Obrault</h2>
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

const NotFoundPage = () => (
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

// Simple placeholder components for sub-pages
const SubPage = ({ title, description }: { title: string; description: string }) => (
  <div className="text-white space-y-8 max-w-4xl text-center">
    <h1 className="text-4xl font-bold text-purple-400">{title}</h1>
    <p className="text-xl text-gray-300">{description}</p>
    <p className="text-gray-500">More content coming soon... 🚧</p>
  </div>
)

export default function Page() {
  const { currentPage } = useLabyrinthStore()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'formation':
        return <FormationPage />
      case 'ai':
        return <AIPage />
      case 'projects':
        return <ProjectsPage />
      case 'personal':
        return <PersonalPage />
      case 'formation-advanced':
        return <SubPage title="🚀 Advanced Skills" description="Deep technical expertise and specialized knowledge" />
      case 'ai-chat':
        return <SubPage title="💬 AI Assistant" description="Chat with my AI-powered assistant" />
      case 'projects-web3':
        return <SubPage title="⛓️ Web3 Projects" description="Blockchain and decentralized applications" />
      case 'personal-music':
        return <SubPage title="🎵 My Music" description="Original compositions and soundtracks" />
      case '404':
        return <NotFoundPage />
      default:
        return <HomePage />
    }
  }

  return renderPage()
}
