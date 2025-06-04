import { Button } from '@/components/ui/button'
import { getProfile } from '@/lib/sanity/queries'

interface ProfileData {
  fullName?: string
  currentTitle?: string
  heroRoles?: string[]
  biography?: string
}

export async function Hero() {
  const profile = await getProfile()
  
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          {profile?.fullName || 'Ishan Perera'}
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {profile?.currentTitle || 'Medical Student • Researcher • Business Owner • Developer'}
        </p>
        <div className="space-x-4">
          <Button size="lg">
            View Projects
          </Button>
          <Button variant="outline" size="lg">
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  )
}