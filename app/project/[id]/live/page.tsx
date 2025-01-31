'use client'

import { useParams, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getProject } from '@/lib/utils'

export default async function LiveDemoPage() {
  const params = useParams();
    const searchParams = useSearchParams();
    const month = searchParams.get("month") ?? "january";
    const year = parseInt(searchParams.get("year") ?? "2025");
  const project = await getProject(params.id as string, month, year);
  
  if (!project) {
    return <div>Project not found</div>
  }

  const ProjectComponent = dynamic(
    () => import(`@/projects/${project.year}/${project.month}/project${project.id}`),
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
            <Link href={`/projects/${project.year}/${project.month}`}>
              ← Back to {project.month.charAt(0).toUpperCase() + project.month.slice(1)} Projects
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