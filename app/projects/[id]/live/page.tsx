'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getProject } from '@/lib/utils'
import { useParams } from 'next/navigation'

export default async function LiveDemoPage() {
  const params = useParams()
  const project = await getProject(params.id as string)
  
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
          <Button asChild>
            <Link 
              href={`/projects/${project.id}`}
            >
              ← Back to Details
            </Link>
          </Button>
        </div>
        
        <div className="p-8 border rounded-lg bg-card shadow-sm">
          <ProjectComponent />
        </div>
      </div>
    </div>
  )
}
