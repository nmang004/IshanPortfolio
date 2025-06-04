'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface StorySection {
  id: string
  title: string
  content: string
  image?: string
  year?: string
}

const storyData: StorySection[] = [
  {
    id: 'passion',
    title: 'The Spark of Passion',
    content: 'My journey into medicine began with a deep curiosity about the human body and a desire to make a meaningful impact on people\'s lives. Growing up, I was always fascinated by how things work, whether it was taking apart mechanical devices or understanding biological processes.',
    year: 'Early Years',
  },
  {
    id: 'education',
    title: 'Academic Foundation',
    content: 'Entering medical school at Edward Via College of Osteopathic Medicine marked the beginning of an intensive but rewarding journey. The holistic approach of osteopathic medicine resonated deeply with my belief in treating the whole person, not just symptoms.',
    year: '2022',
  },
  {
    id: 'research',
    title: 'Research & Innovation',
    content: 'My passion for research emerged naturally as I delved deeper into medical studies. The opportunity to contribute to medical knowledge while still a student has been incredibly fulfilling, leading to multiple publications and conference presentations.',
    year: '2023-2024',
  },
  {
    id: 'business',
    title: 'Entrepreneurial Spirit',
    content: 'Balancing medical school with entrepreneurship has taught me valuable lessons in time management, leadership, and innovation. Building and managing businesses while pursuing medicine has enriched my perspective on healthcare delivery and patient care.',
    year: '2020-Present',
  },
  {
    id: 'service',
    title: 'Community Impact',
    content: 'Volunteer work has been a cornerstone of my journey, providing hands-on experience with patient care and community health. These experiences have shaped my understanding of healthcare disparities and the importance of accessible medical care.',
    year: 'Ongoing',
  },
  {
    id: 'future',
    title: 'Looking Forward',
    content: 'As I continue my medical education and research endeavors, I\'m excited about the possibilities that lie ahead. My goal is to bridge the gap between innovative research, compassionate patient care, and effective healthcare delivery.',
    year: 'Future',
  },
]

export function PersonalStory() {
  const [currentSection, setCurrentSection] = useState(0)

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % storyData.length)
  }

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + storyData.length) % storyData.length)
  }

  const currentStory = storyData[currentSection]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Story Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {storyData.map((story, index) => (
          <button
            key={story.id}
            onClick={() => setCurrentSection(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              index === currentSection
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {story.year}
          </button>
        ))}
      </div>

      {/* Story Content */}
      <Card className="min-h-[400px] relative overflow-hidden">
        <CardContent className="p-0">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-primary">
                    {currentStory.year}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold mt-1">
                    {currentStory.title}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentStory.content}
                </p>
              </div>

              {/* Placeholder for future images */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">
                        {currentSection + 1}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Story Chapter {currentSection + 1}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSection}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSection}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          {storyData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSection
                  ? 'bg-primary'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}