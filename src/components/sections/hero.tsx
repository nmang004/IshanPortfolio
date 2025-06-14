import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getProfile } from '@/lib/sanity/queries'
import { ArrowRight, Download } from 'lucide-react'

interface ProfileData {
  fullName?: string
  currentTitle?: string
  heroRoles?: string[]
  biography?: string
}

export async function Hero() {
  const profile = await getProfile()
  
  return (
    <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-gray-900 dark:via-background dark:to-gray-800">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-5" />
      
      <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
        {/* Animated badge */}
        <div className="animate-pulse">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-background/60 backdrop-blur-sm">
            ✨ Welcome to my portfolio
          </div>
        </div>
        
        {/* Main heading with staggered animation */}
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
          {profile?.fullName || 'Ishan Perera'}
        </h1>
        
        {/* Subtitle with animation */}
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {profile?.currentTitle || 'Medical Student • Researcher • Business Owner • Developer'}
        </p>
        
        {/* CTA buttons with hover animations */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="group transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Link href="/projects">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary hover:text-primary-foreground">
            <Link href="/contact">
              Contact Me
              <Download className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
            </Link>
          </Button>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-32 right-20 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-pulse" />
      </div>
    </section>
  )
}