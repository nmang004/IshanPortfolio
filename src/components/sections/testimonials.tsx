import Link from 'next/link'
import { getTestimonials } from '@/lib/sanity/queries'
import { Quote, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Testimonial {
  _id: string
  authorName: string
  authorTitle?: string
  organization?: string
  testimonialText: string
}

export async function Testimonials() {
  const testimonials = await getTestimonials()

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Professional References
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-purple-900 dark:from-white dark:to-purple-100 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Testimonials from colleagues, mentors, and collaborators who have witnessed my commitment to excellence in medicine and research.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <div
                key={testimonial._id}
                className="group relative"
              >
                <div className="h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Quote icon */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Quote className="h-4 w-4 text-white" />
                  </div>
                  
                  {/* Rating stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Testimonial text */}
                  <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                    &ldquo;{testimonial.testimonialText}&rdquo;
                  </blockquote>
                  
                  {/* Author info */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {testimonial.authorName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {testimonial.authorName}
                        </div>
                        {testimonial.authorTitle && (
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {testimonial.authorTitle}
                          </div>
                        )}
                        {testimonial.organization && (
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {testimonial.organization}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="max-w-md mx-auto text-center p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Quote className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No testimonials available</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Professional references and testimonials will be displayed here once available.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">Connect with me</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trusted by colleagues and mentors in medicine and research
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}