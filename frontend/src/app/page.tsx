'use client'

import { useLabyrinthStore } from '@/stores/useLabyrinthStore'
import { HomePage } from '@/components/pages/HomePage'
import { FormationPage } from '@/components/pages/FormationPage'
import { AIPage } from '@/components/pages/AIPage'
import { ProjectsPage } from '@/components/pages/ProjectsPage'
import { PersonalPage } from '@/components/pages/PersonalPage'
import { NotFoundPage } from '@/components/pages/NotFoundPage'
import { SubPage } from '@/components/pages/SubPage'
import { PersonalMusicPage } from '@/components/pages/PersonalMusicPage'

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
      case 'personal-music':
        return <PersonalMusicPage />
      case 'personal-games':
        return <SubPage title="🎮 Games" description="My games" />
      case 'personal-literature':
        return <SubPage title="📚 Literature" description="My literature" />
      case '404':
        return <NotFoundPage />
      default:
        return <HomePage />
    }
  }

  return renderPage()
}
