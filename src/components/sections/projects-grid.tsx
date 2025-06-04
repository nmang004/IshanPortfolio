export function ProjectsGrid() {
  return (
    <section className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Research Projects
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore my research work in medicine, technology, and innovation.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {/* Project cards will be populated from Sanity */}
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="rounded-md p-6">
            <h3 className="font-semibold">Project Title</h3>
            <p className="text-sm text-muted-foreground">Project description...</p>
          </div>
        </div>
      </div>
    </section>
  )
}