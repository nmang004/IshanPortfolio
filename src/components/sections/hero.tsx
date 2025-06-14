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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400/25 to-cyan-500/25 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="container relative z-10 px-4">
        <div className="mx-auto max-w-5xl text-center">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl backdrop-blur-xl">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wide">Welcome to my portfolio</span>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-6 mb-8">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white">
              {profile?.fullName || 'Ishan Perera'}
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-600 dark:text-slate-300">
              {profile?.currentTitle || 'Medical Student • Researcher • Business Owner • Developer'}
            </p>
          </div>
          
          {/* Description */}
          <p className="max-w-3xl mx-auto text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 font-medium">
            Passionate about advancing healthcare through innovation, research, and technology. 
            Currently pursuing my Doctor of Osteopathic Medicine while building impactful solutions.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button size="lg" asChild className="group h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 rounded-2xl">
              <Link href="/projects">
                View My Research
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="group h-14 px-8 text-lg font-semibold border-2 border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:shadow-2xl rounded-2xl">
              <Link href="/contact">
                Get In Touch
                <Download className="ml-3 h-6 w-6 transition-transform group-hover:rotate-12" />
              </Link>
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">10+</div>
                <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">Research Projects</div>
              </div>
            </div>
            <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">1800+</div>
                <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">Volunteer Hours</div>
              </div>
            </div>
            <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-3xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">3000+</div>
                <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">Patient Contact Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping animation-delay-2000"></div>
    </section>
  )
}