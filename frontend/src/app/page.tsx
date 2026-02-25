'use client'

import { useLabyrinthStore } from '@/labyrinth/stores/useLabyrinthStore'
import { HomePage } from '@/views/home/HomePage'
import { FormationPage } from '@/views/pages/FormationPage'
import { AIPage } from '@/views/pages/AIPage'
import { ProjectsPage } from '@/views/pages/ProjectsPage'
import { PersonalPage } from '@/views/pages/PersonalPage'
import { NotFoundPage } from '@/views/pages/NotFoundPage'
import { SubPage } from '@/views/pages/SubPage'
import { PersonalMusicPage } from '@/views/pages/PersonalMusicPage'

export default function Page() {
  const { currentPage } = useLabyrinthStore()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'formation':
        return <FormationPage />
      case 'projects':
        return <ProjectsPage />
      case 'blockchain':
        return <SubPage title="💰 Blockchain" description="My blockchain" />
      case 'entrepreneurship':
        return <SubPage title="💼 Entrepreneurship" description="My entrepreneurship" />
      case 'personal-projects':
        return <SubPage title="💻 Personal Projects" description="My personal projects" />
      case 'personal':
        return <PersonalPage />
      case 'health':
        return <SubPage title="🧘 Health" description="My health" />
      case 'personal-music':
        return <PersonalMusicPage />
      case 'personal-games':
        return <SubPage title="🎮 Games" description="My games" />
      case 'personal-literature':
        return <SubPage title="📚 Literature" description="My literature" />
      case 'ai':
        return <AIPage />
      case '404':
        return <NotFoundPage />
      default:
        return <HomePage />
    }
  }

  return renderPage()
}
