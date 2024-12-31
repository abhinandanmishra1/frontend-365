'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { projects } from '@/projects/data'

interface Props {
  params: {
    id: string
  }
}

export default function LiveDemoPage({ params }: Props) {
  const project = projects.find(p => p.id === parseInt(params.id))
  
  if (!project) {
    return <div>Project not found</div>
  }

  const ProjectComponent = dynamic(
    () => import(`@/projects/project${project.id}`),
    { 
      loading: () => <div>Loading...</div>,
      ssr: false 
    }
  )

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <Link 
            href={`/projects/${project.id}`}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            ← Back to Details
          </Link>
        </div>
        
        <div className="p-8 border rounded-lg bg-white shadow-sm">
          <ProjectComponent />
        </div>
      </div>
    </div>
  )
}
