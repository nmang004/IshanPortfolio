import { Hero } from '@/components/sections/hero'
import { ProjectsGrid } from '@/components/sections/projects-grid'
import { Testimonials } from '@/components/sections/testimonials'
import dynamic from 'next/dynamic'

const ContactFormWrapper = dynamic(
  () => import('@/components/sections/contact-form-wrapper').then(mod => ({ default: mod.ContactFormWrapper })),
  { ssr: false }
)

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <Testimonials />
      <ContactFormWrapper />
    </>
  )
}