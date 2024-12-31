'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/projects/data'
import { useState } from 'react'

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)
  const projectsPerPage = 12

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const paginatedProjects = filteredProjects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage
  )

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="mb-6">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Basic">Basic</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="p-0 h-48 border-b">
              <Image src={project.image} alt={project.name} width={300} height={200} className="object-cover" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle>{project.name}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/projects/${project.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center space-x-2">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page * projectsPerPage >= filteredProjects.length}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

