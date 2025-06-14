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
    <section className="relative min-h-[80vh] flex items-center justify-center py-12 lg:py-20">
      {/* Background with strong visual impact */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-emerald-600/10 dark:from-blue-400/20 dark:via-purple-400/10 dark:to-emerald-400/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent)]" />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Welcome to my portfolio</span>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                {profile?.fullName || 'Ishan Perera'}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-medium">
              {profile?.currentTitle || 'Medical Student • Researcher • Business Owner • Developer'}
            </p>
          </div>
          
          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Passionate about advancing healthcare through innovation, research, and technology. 
            Currently pursuing my Doctor of Osteopathic Medicine while building impactful solutions.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link href="/projects">
                View My Research
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="group border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Link href="/contact">
                Get In Touch
                <Download className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              </Link>
            </Button>
          </div>
          
          {/* Stats or highlights */}
          <div className="pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Research Projects</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1800+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Volunteer Hours</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">3000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Patient Contact Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-lg animate-pulse"></div>
    </section>
  )
}