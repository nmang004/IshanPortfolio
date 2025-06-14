import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { researchProjectsQuery } from '@/lib/sanity/queries'
import { ArrowUpRight, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  abstract?: string
  publishedDate?: string
  tags?: string[]
}

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(researchProjectsQuery)
    return projects || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function ProjectsGrid() {
  const projects = await getProjects()

  return (
    <section className="py-16 lg:py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            <Tag className="w-4 h-4" />
            Research Portfolio
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
              Research Projects
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Explore my research work in medicine, technology, and innovation. Each project represents a commitment to advancing healthcare through evidence-based research.
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.slice(0, 6).map((project, index) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="group block"
              >
                <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                  
                  {/* Arrow icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    {/* Category */}
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                      {project.category || 'Research'}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                      {project.title || 'Medical Research Project'}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {project.abstract 
                        ? project.abstract.substring(0, 120) + '...' 
                        : 'A comprehensive research project exploring innovative methodologies and their applications in modern healthcare practices.'
                      }
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium">
                          {tag}
                        </span>
                      )) || (
                        <>
                          <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium">Medical Research</span>
                          <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium">Innovation</span>
                        </>
                      )}
                    </div>
                    
                    {/* Date */}
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      {project.publishedDate 
                        ? new Date(project.publishedDate).getFullYear()
                        : '2024'
                      }
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full">
              <div className="max-w-md mx-auto text-center p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No projects available</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Research projects will be displayed here once the content management system is configured.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">Get in touch to learn more</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* View All Button */}
        {projects.length > 6 && (
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/projects">
                View all {projects.length} projects
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}