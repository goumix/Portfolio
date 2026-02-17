'use client'

import { useLabyrinthStore } from '@/stores/useLabyrinthStore'
import { HomePage } from '@/components/pages/HomePage'
import { FormationPage } from '@/components/pages/FormationPage'
import { AIPage } from '@/components/pages/AIPage'
import { ProjectsPage } from '@/components/pages/ProjectsPage'
import { PersonalPage } from '@/components/pages/PersonalPage'
import { NotFoundPage } from '@/components/pages/NotFoundPage'
import { SubPage } from '@/components/pages/SubPage'

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
