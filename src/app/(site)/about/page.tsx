import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Download, ExternalLink, Award, BookOpen, Heart, MapPin } from 'lucide-react'
import { AnimatedTimeline } from '@/components/sections/animated-timeline'
import { SkillsMatrix } from '@/components/sections/skills-matrix'
import { PersonalStory } from '@/components/sections/personal-story'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'About Ishan Perera',
  description: 'Learn about Ishan Perera\'s journey in medicine, research, and business. From medical student to entrepreneur, researcher, and innovator.',
  keywords: ['medical student', 'researcher', 'entrepreneur', 'VCOM', 'biography', 'background'],
}

const achievements = [
  {
    title: 'Medical Student',
    institution: 'Edward Via College of Osteopathic Medicine',
    year: '2022-Present',
    description: 'Pursuing Doctor of Osteopathic Medicine with focus on research and innovation',
    icon: BookOpen,
  },
  {
    title: 'Research Publications',
    institution: 'Multiple Journals',
    year: '2023-2024',
    description: '10+ research publications in medical journals and conference presentations',
    icon: Award,
  },
  {
    title: 'Business Owner',
    institution: 'Multiple Ventures',
    year: '2020-Present',
    description: 'Founded and operated multiple successful business ventures',
    icon: ExternalLink,
  },
  {
    title: 'Community Service',
    institution: 'Various Organizations',
    year: '2018-Present',
    description: '1800+ hours of volunteer service in healthcare and community initiatives',
    icon: Heart,
  },
]

const personalFacts = [
  {
    label: 'Patient Contact Hours',
    value: '3,168+',
    description: 'Direct patient interaction experience',
  },
  {
    label: 'Volunteer Hours',
    value: '1,800+',
    description: 'Community service and healthcare volunteering',
  },
  {
    label: 'Consulting Hours',
    value: '1,453',
    description: 'Business and strategic consulting experience',
  },
  {
    label: 'Team Members Managed',
    value: '40+',
    description: 'Employees across various business ventures',
  },
]

const currentInterests = [
  'Medical Research & Innovation',
  'Healthcare Technology',
  'Business Strategy',
  'Community Health',
  'Medical Education',
  'Entrepreneurship',
  'Wine Making & Viticulture',
  'Automotive Mechanics',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8">
                {/* Professional Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
                  <BookOpen className="w-4 h-4" />
                  About Me
                </div>
                
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    About Ishan Perera
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Medical student, researcher, and entrepreneur passionate about advancing healthcare 
                    through innovation, research, and community service. Currently pursuing my Doctor 
                    of Osteopathic Medicine while building businesses and conducting cutting-edge research.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <a href="/assets/Current - Ishan - CV.pdf" download>
                      <Download className="w-5 h-5 mr-2" />
                      Download CV
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                    <Link href="/contact">
                      Get in Touch
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center mb-6">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Profile Image</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-gray-900 dark:text-white">Virginia, USA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                By the Numbers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Quantifying my experience and commitment to excellence in medicine, research, and community service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {personalFacts.map((fact, index) => (
                <div key={index} className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {fact.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{fact.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{fact.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6 border border-purple-200 dark:border-purple-800">
                <Award className="w-4 h-4" />
                My Journey
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Professional Timeline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                From medical school to entrepreneurship, research to community service - 
                explore the milestones that have shaped my career and passion for healthcare innovation.
              </p>
            </div>
            <AnimatedTimeline />
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-6 border border-emerald-200 dark:border-emerald-800">
                <Heart className="w-4 h-4" />
                Skills & Expertise
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Areas of Expertise
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                A diverse skill set spanning medicine, research, business, and technology, 
                developed through years of hands-on experience and continuous learning.
              </p>
            </div>
            <SkillsMatrix />
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Key Achievements
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Milestones and accomplishments that reflect my commitment to excellence 
                in medicine, research, and community service.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                      <achievement.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{achievement.title}</h3>
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">
                        {achievement.institution}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Personal Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Beyond the credentials and achievements, discover the personal journey 
                and experiences that drive my passion for medicine and innovation.
              </p>
            </div>
            <PersonalStory />
          </div>
        </div>
      </section>

      {/* Interests & Hobbies */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Current Interests
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Areas of passion and curiosity that fuel my continuous learning and growth.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {currentInterests.map((interest, index) => (
                <span key={index} className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Let&apos;s Connect
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Interested in collaboration, research opportunities, or just want to connect? 
              I&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                <Link href="/projects">
                  View My Research
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}