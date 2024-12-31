import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="space-y-6 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          365 Days of Frontend Coding
        </h1>
        <p className="max-w-[700px] text-lg sm:text-xl text-center">
          Embark on a journey through 365 unique UI components, crafted daily to push the boundaries of frontend development.
        </p>
        <Button asChild size="lg">
          <Link href="/projects">
            Explore Projects
          </Link>
        </Button>
      </div>
    </div>
  )
}

