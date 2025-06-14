'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Skill {
  name: string
  level: number
  category: string
  yearsExperience?: number
  certified?: boolean
}

const skillsData: Skill[] = [
  // Medical Skills
  { name: 'Clinical Medicine', level: 85, category: 'Medical', yearsExperience: 3 },
  { name: 'Research Methodology', level: 95, category: 'Medical', yearsExperience: 4, certified: true },
  { name: 'Patient Care', level: 90, category: 'Medical', yearsExperience: 3 },
  { name: 'Medical Writing', level: 92, category: 'Medical', yearsExperience: 4 },
  
  // Business Skills
  { name: 'Strategic Planning', level: 88, category: 'Business', yearsExperience: 5 },
  { name: 'Team Leadership', level: 90, category: 'Business', yearsExperience: 5 },
  { name: 'Financial Analysis', level: 85, category: 'Business', yearsExperience: 4 },
  { name: 'Operations Management', level: 87, category: 'Business', yearsExperience: 5 },
  
  // Technical Skills
  { name: 'Data Analysis', level: 88, category: 'Technical', yearsExperience: 4 },
  { name: 'Statistical Software', level: 85, category: 'Technical', yearsExperience: 3, certified: true },
  { name: 'Database Management', level: 80, category: 'Technical', yearsExperience: 3 },
  { name: 'Microsoft Office Suite', level: 95, category: 'Technical', yearsExperience: 8, certified: true },
  
  // Soft Skills
  { name: 'Communication', level: 95, category: 'Soft Skills', yearsExperience: 8 },
  { name: 'Problem Solving', level: 92, category: 'Soft Skills', yearsExperience: 8 },
  { name: 'Critical Thinking', level: 90, category: 'Soft Skills', yearsExperience: 6 },
  { name: 'Project Management', level: 88, category: 'Soft Skills', yearsExperience: 5 },
]

const categories = Array.from(new Set(skillsData.map(skill => skill.category)))

export function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [animatedValues, setAnimatedValues] = useState<{[key: string]: number}>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.1, // Reduced threshold for better mobile detection
    margin: "0px 0px -100px 0px" // Trigger earlier
  })

  useEffect(() => {
    if (isInView) {
      skillsData.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedValues(prev => ({
            ...prev,
            [skill.name]: skill.level
          }))
        }, index * 100)
      })
    }
  }, [isInView])

  // Fallback: Trigger animation after component mounts if not triggered by intersection observer
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      const hasAnyValues = Object.keys(animatedValues).length > 0
      if (!hasAnyValues) {
        // Force trigger animation if intersection observer failed
        skillsData.forEach((skill, index) => {
          setTimeout(() => {
            setAnimatedValues(prev => ({
              ...prev,
              [skill.name]: skill.level
            }))
          }, index * 100)
        })
      }
    }, 2000) // Wait 2 seconds before fallback

    return () => clearTimeout(fallbackTimer)
  }, [animatedValues])

  const filteredSkills = selectedCategory 
    ? skillsData.filter(skill => skill.category === selectedCategory)
    : skillsData

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-green-500'
    if (level >= 80) return 'bg-blue-500'
    if (level >= 70) return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        <Badge 
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-2"
          onClick={() => setSelectedCategory(null)}
        >
          All Skills
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  {skill.certified && (
                    <Badge variant="default" className="text-xs">
                      Certified
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  {/* Proficiency Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-medium">{animatedValues[skill.name] || 0}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${getSkillColor(skill.level)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${animatedValues[skill.name] || 0}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  {skill.yearsExperience && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium">
                        {skill.yearsExperience} year{skill.yearsExperience > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
      >
        {categories.map((category) => {
          const categorySkills = skillsData.filter(skill => skill.category === category)
          const avgLevel = Math.round(
            categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length
          )
          
          return (
            <Card key={category} className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  {avgLevel}%
                </div>
                <div className="text-sm font-medium mb-1">{category}</div>
                <div className="text-xs text-muted-foreground">
                  {categorySkills.length} skill{categorySkills.length > 1 ? 's' : ''}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>
    </div>
  )
}