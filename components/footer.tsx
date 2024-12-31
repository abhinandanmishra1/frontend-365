import { Github, Linkedin, Mail } from 'lucide-react'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t px-8">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href="https://www.abhinandanmishra.in"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Abhinandan Mishra
            </a>
            . Showcasing 365 days of frontend coding.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/abhinandanmishra1" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://linkedin.com/in/abhinandanmishra1" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="mailto:abhinandanmishra360@gmail.com">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

