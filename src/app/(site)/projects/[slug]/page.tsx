import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ExternalLink, Calendar, Users, Briefcase } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { getProject, getProjects } from '@/lib/sanity/queries'
import { ShareButtons } from '@/components/ui/share-buttons'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { ReadingProgress } from '@/components/ui/reading-progress'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { generateProjectMetadata } from '@/lib/utils/metadata'
import { formatDate } from '@/lib/utils/formatting'
import { urlFor } from '@/lib/sanity/image'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project: { slug: { current: string } }) => ({
    slug: project.slug.current,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  
  return generateProjectMetadata(project)
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8 relative">
        <Image
          src={urlFor(value).width(800).height(600).url()}
          alt={value.alt || 'Project image'}
          width={800}
          height={600}
          className="rounded-lg"
        />
        {value.caption && (
          <p className="text-sm text-muted-foreground mt-2 text-center italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)
  
  if (!project) {
    notFound()
  }

  return (
    <>
      <ReadingProgress />
      <article className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end">
          <div className="absolute inset-0 z-0">
            {project.researchPoster && (
              <Image
                src={urlFor(project.researchPoster).width(1920).height(1080).url()}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 w-full bg-gradient-to-t from-background to-transparent">
            <div className="container py-12">
              <div className="max-w-4xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  {project.status && (
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-200 mb-6 max-w-3xl">
                  {project.abstract}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  {project.publishedDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time>{formatDate(project.publishedDate)}</time>
                    </div>
                  )}
                  {project.researchers && project.researchers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{project.researchers.length} researcher{project.researchers.length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {project.journal && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{project.journal}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Bar */}
        <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b">
          <div className="container py-3">
            <div className="flex items-center justify-between">
              <nav className="flex gap-4 text-sm">
                <a href="#overview" className="hover:text-primary transition-colors">Overview</a>
                <a href="#methodology" className="hover:text-primary transition-colors">Methodology</a>
                <a href="#findings" className="hover:text-primary transition-colors">Key Findings</a>
                <a href="#references" className="hover:text-primary transition-colors">References</a>
              </nav>
              <div className="flex items-center gap-2">
                {project.doi && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={`https://doi.org/${project.doi}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      DOI
                    </a>
                  </Button>
                )}
                <ShareButtons 
                  url={`${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.slug.current}`}
                  title={project.title}
                  description={project.abstract}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-12">
            {/* Content Column */}
            <div className="space-y-12">
              {/* Overview Section */}
              <section id="overview" className="scroll-mt-32">
                <h2 className="text-3xl font-bold mb-6">Research Overview</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.abstract}
                  </p>
                </div>
              </section>

              {/* Awards Section */}
              {project.awards && project.awards.length > 0 && (
                <section className="scroll-mt-32">
                  <h2 className="text-3xl font-bold mb-6">Awards & Recognition</h2>
                  <div className="grid gap-4">
                    {project.awards.map((award: string, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <p className="font-medium">{award}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Methodology Section */}
              {project.methodology && (
                <section id="methodology" className="scroll-mt-32">
                  <h2 className="text-3xl font-bold mb-6">Methodology</h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={project.methodology} components={portableTextComponents} />
                  </div>
                </section>
              )}

              {/* Key Findings Section */}
              {project.keyFindings && project.keyFindings.length > 0 && (
                <section id="findings" className="scroll-mt-32">
                  <h2 className="text-3xl font-bold mb-6">Key Findings</h2>
                  <div className="space-y-4">
                    {project.keyFindings.map((finding: string, index: number) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <p className="text-lg">{finding}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* References Section */}
              {project.references && project.references.length > 0 && (
                <section id="references" className="scroll-mt-32">
                  <h2 className="text-3xl font-bold mb-6">References</h2>
                  <div className="space-y-4">
                    {project.references.map((ref: { number: number; citation: string; doi?: string }, index: number) => (
                      <div key={index} className="border-l-2 border-muted pl-4">
                        <p className="text-sm">
                          <span className="font-medium">{ref.number}.</span> {ref.citation}
                        </p>
                        {ref.doi && (
                          <a 
                            href={`https://doi.org/${ref.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-sm hover:underline"
                          >
                            DOI: {ref.doi}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Table of Contents */}
              <div className="sticky top-32">
                <TableOfContents />
                
                {/* Project Info Card */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Research Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.publishedDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Published</p>
                        <p className="font-medium">{formatDate(project.publishedDate)}</p>
                      </div>
                    )}
                    {project.journal && (
                      <div>
                        <p className="text-sm text-muted-foreground">Journal</p>
                        <p className="font-medium">{project.journal}</p>
                      </div>
                    )}
                    {project.category && (
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{project.category}</p>
                      </div>
                    )}
                    {project.irbNumber && (
                      <div>
                        <p className="text-sm text-muted-foreground">IRB Number</p>
                        <p className="font-medium">{project.irbNumber}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Researchers Card */}
                {project.researchers && project.researchers.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Research Team</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {project.researchers.map((researcher: { name: string; role?: string; affiliation?: string }, index: number) => (
                        <div key={index}>
                          <p className="font-medium">{researcher.name}</p>
                          {researcher.role && (
                            <p className="text-sm text-muted-foreground">{researcher.role}</p>
                          )}
                          {researcher.affiliation && (
                            <p className="text-xs text-muted-foreground">{researcher.affiliation}</p>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}