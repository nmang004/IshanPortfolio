import { client } from '@/lib/sanity/client'
import { testimonialsQuery } from '@/lib/sanity/queries'

interface Testimonial {
  _id: string
  authorName: string
  authorTitle?: string
  organization?: string
  testimonialText: string
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await client.fetch(testimonialsQuery)
    return testimonials || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function Testimonials() {
  const testimonials = await getTestimonials()

  return (
    <section className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          References
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          What colleagues and mentors say about my work.
        </p>
      </div>
      <div className="mx-auto max-w-[64rem]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div key={testimonial._id} className="rounded-lg border bg-background p-6">
                <blockquote className="text-sm">
                  &ldquo;{testimonial.testimonialText}&rdquo;
                </blockquote>
                <cite className="mt-4 block text-sm text-muted-foreground">
                  — {testimonial.authorName}
                  {testimonial.authorTitle && `, ${testimonial.authorTitle}`}
                  {testimonial.organization && `, ${testimonial.organization}`}
                </cite>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No testimonials found
            </div>
          )}
        </div>
      </div>
    </section>
  )
}