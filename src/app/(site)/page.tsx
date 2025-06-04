import { Hero } from '@/components/sections/hero'
import { ProjectsGrid } from '@/components/sections/projects-grid'
import { Testimonials } from '@/components/sections/testimonials'
import { ContactForm } from '@/components/sections/contact-form'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <Testimonials />
      <ContactForm />
    </>
  )
}