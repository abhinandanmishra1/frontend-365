'use client'

import Link from 'next/link'
import { StreakCounter } from './streak-counter'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

const Header = () => {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky px-8 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className={`transition-colors hover:text-foreground/80 ${pathname === '/' ? 'text-foreground' : 'text-foreground/60'}`}>
            Home
          </Link>
          <Link href="/projects" className={`transition-colors hover:text-foreground/80 ${pathname.startsWith('/projects') ? 'text-foreground' : 'text-foreground/60'}`}>
            Projects
          </Link>
          <Link href="/about" className={`transition-colors hover:text-foreground/80 ${pathname === '/about' ? 'text-foreground' : 'text-foreground/60'}`}>
            About
          </Link>
        </nav>
        <div className="flex-1" />
        {/* <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className="mr-6"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button> */}

        <StreakCounter />
      </div>
    </header>
  )
}

export default Header

