import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { researchProjectsQuery } from '@/lib/sanity/queries'
import { ArrowUpRight, Calendar, Tag, ArrowLeft, ExternalLink } from 'lucide-react'
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

const fallbackProjects = [
  {
    _id: 'lumbar-laminectomy',
    title: 'Lumbar Laminectomy Research',
    slug: { current: 'lumbar-laminectomy-research' },
    category: 'Clinical Research',
    abstract: 'Published research in Cureus journal focusing on pseudomeningocele and duro-cutaneous fistula complications in lumbar laminectomy procedures.',
    publishedDate: '2023-12-01',
    tags: ['Neurosurgery', 'Clinical Study', 'Cureus Journal']
  },
  {
    _id: 'ai-heart-failure',
    title: 'AI Heart Failure Classification Model',
    slug: { current: 'ai-heart-failure-classification' },
    category: 'Medical AI',
    abstract: 'Comparative analysis of AI classification models for heart failure diagnosis using NYHA keywords and comprehensive patient history data.',
    publishedDate: '2023-11-15',
    tags: ['Machine Learning', 'Cardiology', 'Healthcare AI']
  },
  {
    _id: 'chiari-malformations',
    title: 'Chiari I Malformations Geometric Morphometric Analysis',
    slug: { current: 'chiari-malformations-analysis' },
    category: 'Neurological Research',
    abstract: 'Advanced geometric morphometric analysis of Chiari I malformations. Accepted for AANS 2023 Annual Scientific Meeting and awarded 1st Prize at VCOM-VA 2023 Research Day.',
    publishedDate: '2023-10-20',
    tags: ['Neurology', 'AANS Conference', 'Award Winner']
  },
  {
    _id: 'dermatologic-procedures',
    title: 'Dermatologic Procedures with Silicone Skin Models',
    slug: { current: 'dermatologic-procedures-study' },
    category: 'Medical Education',
    abstract: 'IRB approved study examining the effectiveness of silicone skin models in dermatologic procedure training. Research poster accepted at VCOM-VA 2023 Research Day.',
    publishedDate: '2023-09-30',
    tags: ['Dermatology', 'Medical Education', 'IRB Approved']
  },
  {
    _id: 'medical-student-demographics',
    title: 'Medical Student Demographics Educational Research',
    slug: { current: 'medical-student-demographics' },
    category: 'Educational Research',
    abstract: 'Comprehensive study aimed at improving educational modalities through demographic analysis. Received 3rd Prize at VCOM-VA 2023 Research Day.',
    publishedDate: '2023-08-15',
    tags: ['Medical Education', 'Demographics', 'VCOM Research']
  },
  {
    _id: 'medicare-medicaid-infographic',
    title: 'Medicare vs. Medicaid Educational Resource',
    slug: { current: 'medicare-medicaid-infographic' },
    category: 'Healthcare Policy',
    abstract: 'Comprehensive infographic and educational resource comparing Medicare and Medicaid systems to improve healthcare literacy among medical students and patients.',
    publishedDate: '2023-07-10',
    tags: ['Healthcare Policy', 'Education', 'Public Health']
  }
]

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(researchProjectsQuery)
    if (projects && projects.length > 0) {
      return projects
    }
    return fallbackProjects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return fallbackProjects
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800">
              <Tag className="w-4 h-4" />
              Complete Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Research Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              A comprehensive collection of my research work in medicine, technology, and innovation. 
              Each project represents a commitment to advancing healthcare through evidence-based research and innovative methodologies.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group block"
            >
              <article className="h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium">
                    {project.category}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.abstract}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {project.publishedDate 
                        ? new Date(project.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                        : 'Recent'
                      }
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-1">
                      Read more 
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{projects.length}+</div>
              <div className="text-gray-600 dark:text-gray-300">Research Projects</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">3</div>
              <div className="text-gray-600 dark:text-gray-300">Research Awards</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5+</div>
              <div className="text-gray-600 dark:text-gray-300">Conference Presentations</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Interested in Collaboration?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing research opportunities, sharing insights, or exploring potential collaborations in medical research and innovation.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
              <Link href="/contact">
                Get in Touch
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}