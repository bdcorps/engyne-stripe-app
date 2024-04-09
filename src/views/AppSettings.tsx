import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context'
import { Box, ContextView, Inline, Link, Spinner } from '@stripe/ui-extension-sdk/ui'
import { getAccountId } from '../../config'
import { useSite } from '../hooks/api'
import BrandIcon from '../views/engyne_320.png'

const AppSettings = (props: ExtensionContextValue) => {
  const { userContext, environment } = props
  const { mode } = environment
  const stripeAccountId = getAccountId(userContext?.account?.id)

  const { data: site, isLoading: isSiteLoading } = useSite(stripeAccountId)

  if (isSiteLoading) {
    return <Spinner size="small" />
  }

  const renderUI = () => {
    if (!site) {

    } else {

    }
  }

  return (
    <ContextView title="Get started" brandIcon={BrandIcon} brandColor="#eee">
      <Link href="https://www.stripe.com" > Primary link</Link >
      <Box css={{ layout: 'row', gap: 'small', alignX: "end" }}>
        <Link href="https://app.engyne.ai">
          Authenticate the Stripe app inside of Engyne - you only need to do this once.
        </Link>
        <Link href="https://app.engyne.ai">
          Configure or disconnect the Stripe app inside of Engyne.
        </Link>
        <Inline>Works only with live mode. Test mode is not supported.</Inline>
      </Box>


    </ContextView >
  )
}

export default AppSettings
