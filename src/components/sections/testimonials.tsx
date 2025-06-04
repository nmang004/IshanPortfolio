export function Testimonials() {
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
        {/* Testimonials will be populated from Sanity */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-background p-6">
            <blockquote className="text-sm">
              &ldquo;Testimonial content will be loaded from Sanity CMS...&rdquo;
            </blockquote>
            <cite className="mt-4 block text-sm text-muted-foreground">
              — Reference Name
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}