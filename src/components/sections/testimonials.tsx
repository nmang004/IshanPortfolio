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
    <section className="py-20 lg:py-32 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6 border border-purple-200 dark:border-purple-800">
            <Users className="w-4 h-4" />
            Professional References
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What People Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Testimonials from colleagues, mentors, and collaborators who have witnessed my commitment to excellence in medicine and research.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="max-w-6xl mx-auto">
          {testimonials.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className="group relative"
                >
                  <div className="h-full bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Quote icon */}
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Testimonial text */}
                    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      &ldquo;{testimonial.testimonialText}&rdquo;
                    </blockquote>
                    
                    {/* Author info */}
                    <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {testimonial.authorName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.authorName}
                          </div>
                          {testimonial.authorTitle && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {testimonial.authorTitle}
                            </div>
                          )}
                          {testimonial.organization && (
                            <div className="text-sm text-gray-500 dark:text-gray-500">
                              {testimonial.organization}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 p-8 shadow-sm">
                <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Quote className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Professional References</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  I'm building relationships with mentors and colleagues in the medical field. 
                  Professional testimonials will be featured here as my career progresses.
                </p>
                <Button asChild variant="outline" className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20">
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