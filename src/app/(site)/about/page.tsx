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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                About Ishan Perera
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Medical student, researcher, and entrepreneur passionate about advancing healthcare 
                through innovation, research, and community service. Currently pursuing my Doctor 
                of Osteopathic Medicine while building businesses and conducting cutting-edge research.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="/assets/Current - Ishan - CV.pdf" download>
                    <Download className="w-5 h-5 mr-2" />
                    Download CV
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <Image
                  src="/assets/img/profile-img2.jpg"
                  alt="Ishan Perera"
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Virginia, USA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {personalFacts.map((fact, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {fact.value}
                  </div>
                  <div className="font-semibold mb-1">{fact.label}</div>
                  <div className="text-sm text-muted-foreground">{fact.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">My Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From medical school to entrepreneurship, research to community service - 
              explore the milestones that have shaped my career and passion for healthcare innovation.
            </p>
          </div>
          <AnimatedTimeline />
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A diverse skill set spanning medicine, research, business, and technology, 
              developed through years of hands-on experience and continuous learning.
            </p>
          </div>
          <SkillsMatrix />
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Key Achievements</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Milestones and accomplishments that reflect my commitment to excellence 
              in medicine, research, and community service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <Badge variant="secondary">{achievement.year}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium mb-2">
                        {achievement.institution}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Personal Story</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond the credentials and achievements, discover the personal journey 
              and experiences that drive my passion for medicine and innovation.
            </p>
          </div>
          <PersonalStory />
        </div>
      </section>

      {/* Interests & Hobbies */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Current Interests</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Areas of passion and curiosity that fuel my continuous learning and growth.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {currentInterests.map((interest, index) => (
              <Badge key={index} variant="outline" className="text-base py-2 px-4">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Interested in collaboration, research opportunities, or just want to connect? 
            I&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                View My Research
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}