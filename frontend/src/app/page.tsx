'use client'

import { useLabyrinthStore } from '@/labyrinth/stores/useLabyrinthStore'
import { HomeView } from '@/views/home/HomeView'
import { FormationView } from '@/views/formation/FormationView'
import { AIView } from '@/views/AI/AIView'
import { ProjectsView } from '@/views/projects/ProjectsView'
import { PersonalView } from '@/views/personal/PersonalView'
import { NotFoundPage } from '@/views/pages/NotFoundPage'
import { SubPage } from '@/views/pages/SubPage'
import { MusicView } from '@/views/music/MusicView'

export default function Page() {
  const { currentPage } = useLabyrinthStore()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />
      case 'formation':
        return <FormationView />
      case 'projects':
        return <ProjectsView />
      case 'blockchain':
        return <SubPage title="💰 Blockchain" description="My blockchain" />
      case 'entrepreneurship':
        return <SubPage title="💼 Entrepreneurship" description="My entrepreneurship" />
      case 'personal-projects':
        return <SubPage title="💻 Personal Projects" description="My personal projects" />
      case 'personal':
        return <PersonalView />
      case 'health':
        return <SubPage title="🧘 Health" description="My health" />
      case 'music':
        return <MusicView />
      case 'games':
        return <SubPage title="🎮 Games" description="My games" />
      case 'literature':
        return <SubPage title="📚 Literature" description="My literature" />
      case 'ai':
        return <AIView />
      case '404':
        return <NotFoundPage />
      default:
        return <HomeView />
    }
  }

  return renderPage()
}
