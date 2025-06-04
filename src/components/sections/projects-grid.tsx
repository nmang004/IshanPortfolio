import { client } from '@/lib/sanity/client'
import { researchProjectsQuery } from '@/lib/sanity/queries'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  abstract?: string
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
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Research Projects
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore my research work in medicine, technology, and innovation.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {projects.length > 0 ? (
          projects.slice(0, 6).map((project) => (
            <div key={project._id} className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="rounded-md p-6">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.abstract ? project.abstract.substring(0, 100) + '...' : 'Research project'}
                </p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {project.category}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            No projects found
          </div>
        )}
      </div>
    </section>
  )
}