import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { researchProjectsQuery } from '@/lib/sanity/queries'
import { ArrowUpRight, Calendar, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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
    <section className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <div>
          <Badge variant="outline" className="mb-4">
            <Tag className="w-3 h-3 mr-1" />
            Research Portfolio
          </Badge>
        </div>
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
          Research Projects
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore my research work in medicine, technology, and innovation.
        </p>
      </div>
      
      <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {projects.length > 0 ? (
          projects.slice(0, 6).map((project, index) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg border bg-background p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/50 group-hover:bg-muted/50">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Arrow icon */}
                <div className="absolute top-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
                
                <div className="relative">
                  {/* Category badge */}
                  <div className="mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  {/* Abstract */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.abstract ? project.abstract.substring(0, 120) + '...' : 'Research project exploring innovative approaches and methodologies.'}
                  </p>
                  
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {/* Date */}
                  {project.publishedDate && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(project.publishedDate).getFullYear()}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            <div className="p-8 rounded-lg border-2 border-dashed">
              <p>No projects found</p>
              <p className="text-sm mt-2">Check back soon for new research updates!</p>
            </div>
          </div>
        )}
      </div>
      
      {/* View all projects button */}
      {projects.length > 6 && (
        <div className="text-center animate-fade-in opacity-0 [animation-delay:1s] [animation-fill-mode:forwards]">
          <Link
            href="/projects"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            View all {projects.length} projects
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  )
}