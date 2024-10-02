import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, Info, RefreshCw, XCircle } from 'lucide-react'
import React from 'react'

type QueryStateDisplayProps = {
  isLoading: boolean
  isError: boolean
  error: unknown
  isSuccess: boolean
  successMessage?: string
  customErrorMessage?: string
  refresh?: () => void
  fallback?: React.ReactNode
}

export default function QueryStateDisplay(
  {
    isLoading,
    isError,
    error,
    isSuccess,
    successMessage = 'Operation completed successfully.',
    customErrorMessage,
    refresh,
    fallback
  }: QueryStateDisplayProps = {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false
  }
) {
  if (isLoading) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="p-4 mx-auto">
        <Alert role="status">
          <Info className="h-4 w-4" />
          <AlertTitle>Loading</AlertTitle>
          <AlertDescription>Please wait while we process your request.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (isError) {
    let title = 'An error occurred'
    let description = customErrorMessage || 'Something went wrong. Please try again later.'
    let Icon = XCircle

    if (!customErrorMessage && typeof error === 'object' && error !== null) {
      if ('status' in error) {
        const status = (error as { status: number }).status
        if (status === 404) {
          title = 'Not Found'
          description = 'The requested resource could not be found.'
          Icon = AlertTriangle
        } else if (status >= 500) {
          title = 'Server Error'
          description = 'There was a problem with the server. Please try again later.'
          Icon = AlertTriangle
        }
      }

      if ('message' in error) {
        description = (error as { message: string }).message
      }
    }

    return (
      <div className="p-4 mx-auto">
        <Alert variant="destructive" role="alert">
          <Icon className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
          {refresh && (
            <Button variant="outline" className="mt-4 text-center" onClick={refresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </Alert>
      </div>
    )
  }

  if (isSuccess) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="p-4 mx-auto ">
        <Alert variant="default" className="bg-green-50 border-green-200" role="status">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return null
}
