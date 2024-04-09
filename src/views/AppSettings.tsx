import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context'
import { getAccountId } from '../../config'
import Layout from '../components/Layout'
import Settings from '../components/Settings'

const AppSettings = (props: ExtensionContextValue) => {
  const { userContext, environment } = props
  const { mode } = environment
  const stripeAccountId = getAccountId(userContext?.account?.id)

  return (
    <Layout accountId={stripeAccountId} mode={mode}>
      <Settings {...props} />
    </Layout>
  )
}

export default AppSettings
