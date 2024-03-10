import type { ButtonProps } from '@mantine/core'
import { Identity, IdentityProvider } from '@tokengator-mint/sdk'
import { IdentityUiProviderButton } from './identity-ui-provider-button'
import { IdentityUiSolanaLinkButton } from './identity-ui-solana-link-button'

export function IdentityUiLinkButton({
  identities,
  provider,
  refresh,
  ...props
}: ButtonProps & {
  identities: Identity[]
  provider: IdentityProvider
  refresh?: () => void
}) {
  switch (provider) {
    case IdentityProvider.Discord:
    case IdentityProvider.GitHub:
    case IdentityProvider.Google:
    case IdentityProvider.Twitter:
      return <IdentityUiProviderButton action="link" provider={provider} {...props} />
    case IdentityProvider.Solana:
      return refresh ? <IdentityUiSolanaLinkButton identities={identities} refresh={refresh} {...props} /> : null
    default:
      return null
  }
}
