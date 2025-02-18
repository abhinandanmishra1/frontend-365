import './globals.css'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '365 Days of Frontend Coding',
  description: 'Showcasing 365 UI components created in a year-long frontend coding challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

