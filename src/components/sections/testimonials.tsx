import { getTestimonials } from '@/lib/sanity/queries'
import { Quote, Star, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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
    <section className="relative py-8 md:py-12 lg:py-24 bg-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container space-y-6 relative">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <div className="animate-fade-in opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <Badge variant="outline" className="mb-4">
              <Users className="w-3 h-3 mr-1" />
              Professional References
            </Badge>
          </div>
          
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl animate-fade-in opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards] bg-gradient-to-r from-gray-900 to-purple-900 dark:from-white dark:to-purple-100 bg-clip-text text-transparent">
            What People Say
          </h2>
          
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 animate-fade-in opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            Testimonials from colleagues, mentors, and collaborators about my work and character.
          </p>
        </div>
        
        <div className="mx-auto max-w-[64rem]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className={`group animate-fade-in opacity-0 [animation-fill-mode:forwards]`}
                  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                >
                  <div className="relative rounded-lg border bg-background p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/50 group-hover:bg-gradient-to-br group-hover:from-blue-50/50 group-hover:to-purple-50/50 dark:group-hover:from-blue-900/10 dark:group-hover:to-purple-900/10">
                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      <Quote className="h-8 w-8 text-primary" />
                    </div>
                    
                    {/* Star rating visual */}
                    <div className="flex gap-1 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Testimonial text */}
                    <blockquote className="text-sm leading-relaxed mb-4 group-hover:text-foreground transition-colors duration-300">
                      &ldquo;{testimonial.testimonialText}&rdquo;
                    </blockquote>
                    
                    {/* Author info */}
                    <div className="border-t pt-4">
                      <cite className="not-italic">
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">
                          {testimonial.authorName}
                        </div>
                        {testimonial.authorTitle && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {testimonial.authorTitle}
                          </div>
                        )}
                        {testimonial.organization && (
                          <div className="text-xs text-muted-foreground">
                            {testimonial.organization}
                          </div>
                        )}
                      </cite>
                    </div>
                    
                    {/* Hover accent */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-lg" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground animate-fade-in opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards]">
                <div className="p-8 rounded-lg border-2 border-dashed bg-background">
                  <Quote className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No testimonials available</p>
                  <p className="text-sm mt-2">Professional references will be displayed here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom accent */}
        <div className="flex justify-center mt-12 animate-fade-in opacity-0 [animation-delay:1s] [animation-fill-mode:forwards]">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary" />
            <span>Trusted by colleagues and mentors</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}