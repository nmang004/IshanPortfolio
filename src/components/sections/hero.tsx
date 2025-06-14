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
    <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Professional Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Medical Student & Researcher
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  {profile?.fullName || 'Ishan Perera'}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                  {profile?.currentTitle || 'Medical Student • Researcher • Business Owner • Developer'}
                </p>
              </div>
              
              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Passionate about advancing healthcare through innovation, research, and technology. 
                Currently pursuing my Doctor of Osteopathic Medicine while building impactful solutions 
                that bridge the gap between medicine and technology.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/projects">
                    View My Research
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                  <Link href="/contact">
                    Get In Touch
                    <Download className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right Column - Stats/Highlights */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Professional Highlights</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">10+</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Research Projects</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Published & ongoing studies</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">1.8K+</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Volunteer Hours</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Community health initiatives</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">3K+</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Patient Contact Hours</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Clinical experience</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Currently</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Pursuing Doctor of Osteopathic Medicine while developing innovative healthcare solutions and conducting research in medical technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}