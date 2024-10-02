import { QueryProvider } from './providers/query-provider'
import { ThemeProvider } from './providers/theme-provider'

interface ProvidersProps {
  children: React.ReactNode
}
export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  )
}
