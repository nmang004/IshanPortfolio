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
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800">
            <Tag className="w-4 h-4" />
            Research Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Research Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Explore my research work in medicine, technology, and innovation. Each project represents a commitment to advancing healthcare through evidence-based research.
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          {projects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 6).map((project, index) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="group block"
                >
                  <article className="h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium">
                        {project.category || 'Research'}
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {project.title || 'Medical Research Project'}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {project.abstract 
                          ? project.abstract.substring(0, 120) + '...' 
                          : 'A comprehensive research project exploring innovative methodologies and their applications in modern healthcare practices.'
                        }
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.slice(0, 3).map((tag, tagIndex) => (
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
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          {project.publishedDate 
                            ? new Date(project.publishedDate).getFullYear()
                            : '2024'
                          }
                        </div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Research Projects Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  I'm currently working on exciting research projects that will be showcased here. 
                  Check back soon for updates on my latest work in medical innovation.
                </p>
                <Button asChild variant="outline" className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
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