import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WifiOff, RefreshCcw, Home, Search } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <WifiOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">You&apos;re Offline</h1>
          <p className="text-muted-foreground">
            It looks like you&apos;ve lost your internet connection. Don&apos;t worry, you can still browse some content that&apos;s been cached.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Offline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/" passHref>
              <Button variant="outline" className="w-full justify-start">
                <Home className="h-4 w-4 mr-2" />
                Homepage
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                About Page
              </Button>
            </Link>
            <Link href="/projects" passHref>
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                Projects
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Button 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          
          <p className="text-sm text-muted-foreground">
            We&apos;ll automatically sync any forms you submit once you&apos;re back online.
          </p>
        </div>
      </div>
    </div>
  )
}