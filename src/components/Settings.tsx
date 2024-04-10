import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context'
import { Box, Button, Icon, Inline, Link, SettingsView, Spinner } from '@stripe/ui-extension-sdk/ui'
import { fetchStripeSignature } from '@stripe/ui-extension-sdk/utils'
import { useEffect, useState } from 'react'
import { getAccountId } from '../../config'
import Layout from '../components/Layout'
import { useSite, useUpdateSite } from '../hooks/api'

const AppSettings = (props: ExtensionContextValue) => {
  const { userContext, environment } = props
  const { mode } = environment
  const stripeAccountId = getAccountId(userContext?.account?.id)

  const { data: site, isLoading: isSiteLoading } = useSite(stripeAccountId)
  const { mutate: updateSiteMutation, isLoading: isUpdateSiteLoading } =
    useUpdateSite();
  const [signature, setSignature] = useState<any>(null);

  useEffect(() => {
    const fetchSignature = async () => {
      const fetchedSignature = await fetchStripeSignature();
      setSignature(fetchedSignature);
    };

    fetchSignature();
  }, []);

  if (isSiteLoading) {
    return <Spinner size="small" />
  }

  const renderUI = () => {
    if (site) {
      return <Box css={{ layout: 'column', gap: 'medium', alignX: "start" }}>
        <Box css={{ layout: 'row', gap: 'small', alignX: "start" }}>
          <Box css={{ layout: 'row', gap: 'small' }}>
            <Icon
              name="checkCircle"
              size="small"
              css={{ fill: 'brand' }}
            />
            {`Stripe account connected to Engyne (ID: ${site.subdomain})`}
          </Box>

          {/* <Icon
            name="settings"
            size="small"
          /> */}

          <Link href={`https://app.engyne.ai/${site.subdomain}/settings?tab=integrations`} external>Configure</Link>


        </Box>
        <Box css={{ layout: 'row', gap: 'small', alignX: "start" }}>
          {isUpdateSiteLoading ? <Spinner size="small" /> : <Button type="destructive" size="small" onPress={() => {
            updateSiteMutation({ subdomain: site.subdomain, data: { stripeAcctId: null } })
          }}>Disconnect</Button>}
        </Box>
      </Box>
    } else {
      return <Box css={{ layout: 'column', gap: 'small', alignX: "start" }}>
        <Inline css={{ fontWeight: "semibold", font: "heading" }}>Account not connected</Inline>
        <Inline>In order to use this app, you need to connect your Stripe account with Engyne</Inline>

        <Link href={`https://app.engyne.ai/api/stripe-app/callback?account_id=${stripeAccountId}&user_id=${userContext?.account?.id}&install_signature=${signature}`} external>Connect to Engyne</Link>
      </Box>
    }
  }

  return (
    <Layout accountId={stripeAccountId} mode={mode}>
      <SettingsView>
        {renderUI()}
        {/* <Box css={{ layout: 'column', gap: 'small', alignX: "start" }}>
          <Link href="https://www.stripe.com" > Primary link</Link >
          <Link href="https://app.engyne.ai">
            Authenticate the Stripe app inside of Engyne - you only need to do this once.
          </Link>
          <Link href="https://app.engyne.ai">
            Configure or disconnect the Stripe app inside of Engyne.
          </Link>
          <Inline>Works only with live mode. Test mode is not supported.</Inline>
        </Box> */}
      </SettingsView>
    </Layout>
  )
}

export default AppSettings
