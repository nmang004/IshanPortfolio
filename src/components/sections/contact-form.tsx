export function ContactForm() {
  return (
    <section className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Get in Touch
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Interested in collaboration or have questions about my work?
        </p>
      </div>
      <div className="mx-auto max-w-[64rem]">
        {/* Contact form will be implemented with react-hook-form */}
        <div className="rounded-lg border bg-background p-6">
          <p className="text-center text-muted-foreground">
            Contact form will be implemented with React Hook Form and Zod validation.
          </p>
        </div>
      </div>
    </section>
  )
}