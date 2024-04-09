import {
  Inline,
  SettingsView
} from '@stripe/ui-extension-sdk/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FunctionComponent, useState } from 'react'
// import BrandIcon from '../views/engyne_320.png'

interface LayoutProps {
  children: React.ReactElement
  accountId: string
  mode: "test" | "live"
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  accountId,
  mode,
}: LayoutProps) => {
  const [queryClient] = useState(() => new QueryClient())

  if (mode === "test") {
    return <SettingsView>
      <Inline>Engyne does not support Test mode. Please switch to Live mode to continue.</Inline>
    </SettingsView >
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default Layout
