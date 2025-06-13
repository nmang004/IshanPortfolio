import { Hero } from '@/components/sections/hero'
import { ProjectsGrid } from '@/components/sections/projects-grid'
import { Testimonials } from '@/components/sections/testimonials'
import { ContactFormWrapper } from '@/components/sections/contact-form-wrapper'

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