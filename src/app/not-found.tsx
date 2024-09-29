import { ContentLayout } from '@/components/dashboard/content-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function NotFound() {
  return (
    <ContentLayout title="Not Found">
      <div className="flex items-center justify-center flex-col flex-1">
        <Card className="w-[420px] text-center">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">404</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-xl font-semibold">Page Not Found</div>
            <p className="text-muted-foreground">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex justify-center">
              <svg
                className="w-32 h-32 text-muted-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ContentLayout>
  )
}
