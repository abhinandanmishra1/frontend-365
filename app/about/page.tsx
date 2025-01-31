import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Github, Linkedin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">About Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>My Journey</CardTitle>
            <CardDescription>365 Days of Frontend Coding</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Hi, I'm Abhinandan Mishra, a passionate frontend developer who embarked on a journey to create 365 unique UI components in 365 days. This challenge was not just about coding; it was about pushing my limits, learning new technologies, and growing as a developer.
            </p>
            <p className="mb-4">
              Throughout this year-long journey, I've explored various aspects of frontend development, from basic HTML and CSS to advanced React patterns and animations. Each day brought a new challenge and a new opportunity to learn and improve.
            </p>
            <p>
              This portfolio showcases the results of my dedication and hard work. I hope it inspires other developers to push their boundaries and never stop learning.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Connect With Me</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="https://github.com/abhinandanmishra1" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="https://linkedin.com/in/abhinandanmishra1" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="https://blog.abhinandanmishra.in" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Blog
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

