'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Award, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TimelineItem {
  id: string
  title: string
  organization: string
  location: string
  startDate: string
  endDate?: string
  current?: boolean
  type: 'education' | 'work' | 'volunteer' | 'achievement'
  description: string
  highlights?: string[]
  icon: React.ElementType
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    title: 'Doctor of Osteopathic Medicine',
    organization: 'Edward Via College of Osteopathic Medicine',
    location: 'Virginia Campus',
    startDate: '2022',
    current: true,
    type: 'education',
    description: 'Pursuing comprehensive medical education with focus on osteopathic principles and research excellence.',
    highlights: ['Research Publications', 'Clinical Rotations', 'Leadership Roles'],
    icon: Award,
  },
  {
    id: '2',
    title: 'Research Coordinator',
    organization: 'Multiple Research Projects',
    location: 'VCOM',
    startDate: '2023',
    current: true,
    type: 'work',
    description: 'Leading and coordinating multiple research initiatives in medical sciences.',
    highlights: ['10+ Publications', 'Conference Presentations', 'IRB Approvals'],
    icon: Users,
  },
  {
    id: '3',
    title: 'Business Owner & Entrepreneur',
    organization: 'Multiple Ventures',
    location: 'Various',
    startDate: '2020',
    current: true,
    type: 'work',
    description: 'Founded and operated successful business ventures while maintaining academic excellence.',
    highlights: ['40+ Employees Managed', 'Multiple Successful Ventures', 'Strategic Consulting'],
    icon: Award,
  },
  {
    id: '4',
    title: 'Community Health Volunteer',
    organization: 'Various Healthcare Organizations',
    location: 'Multiple Locations',
    startDate: '2018',
    current: true,
    type: 'volunteer',
    description: 'Extensive volunteer work in healthcare settings and community service.',
    highlights: ['1800+ Volunteer Hours', 'Patient Care Experience', 'Community Outreach'],
    icon: Users,
  },
]

const iconMap = {
  education: Award,
  work: Users,
  volunteer: Users,
  achievement: Award,
}

const colorMap = {
  education: 'bg-blue-500',
  work: 'bg-green-500',
  volunteer: 'bg-purple-500',
  achievement: 'bg-orange-500',
}

export function AnimatedTimeline() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      timelineData.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, item.id]))
        }, index * 200)
      })
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5" />
      
      <div className="space-y-12">
        {timelineData.map((item, index) => {
          const isVisible = visibleItems.has(item.id)
          const isEven = index % 2 === 0
          const IconComponent = iconMap[item.type]
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`relative flex items-center ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center ${colorMap[item.type]}`}
              >
                <IconComponent className="w-4 h-4 text-white" />
              </motion.div>

              {/* Content Card */}
              <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant={item.current ? 'default' : 'secondary'}>
                        {item.current ? 'Current' : `${item.startDate}${item.endDate ? ` - ${item.endDate}` : ''}`}
                      </Badge>
                      <Badge variant="outline" className="ml-2">
                        {item.type}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{item.organization}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    
                    {item.highlights && item.highlights.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Highlights:</h4>
                        <ul className="space-y-1">
                          {item.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}