'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/Button'
import { Github } from 'lucide-react'
import { useParams } from 'next/navigation'

// Mock data for a single project
const getProjectDetails = (id: string) => ({
  id,
  name: `Project ${id}`,
  description: `Detailed description for Project ${id}`,
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  demoUrl: 'https://example.com',
  githubUrl: 'https://github.com/example/project',
  codeSnippet: `
import React from 'react';

const ExampleComponent = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
};

export default ExampleComponent;
  `
})

export default function ProjectDetailPage() {
  const params = useParams()
  const project = getProjectDetails(params.id as string)

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">{project.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside mb-4">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Technologies Used:</h3>
            <ul className="list-disc list-inside">
              {project.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted flex items-center justify-center">
              <p>Demo placeholder</p>
            </div>
            <div className="mt-4 space-x-4">
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">View Live Demo</a>
              </Button>
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Code Snippet</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-muted rounded-md overflow-x-auto">
            <code>{project.codeSnippet}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

