import { Button, ButtonProps } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Identity, IdentityProvider, solanaGradient } from '@tokengator/sdk'
import { IdentityProviderSolanaLink } from '@tokengator/web-identity-data-access'
import { SolanaClusterProvider } from '@tokengator/web-solana-data-access'
import { IdentityUiIcon } from './identity-ui-icon'
import { IdentityUiSolanaLinkWizard } from './identity-ui-solana-link-wizard'

export function IdentityUiSolanaLinkButton({
  identities = [],
  label,
  refresh,
  ...props
}: ButtonProps & {
  identities?: Identity[]
  refresh: () => void
  label?: string
}) {
  return (
    <Button
      size="xl"
      variant="gradient"
      gradient={solanaGradient}
      leftSection={<IdentityUiIcon provider={IdentityProvider.Solana} />}
      {...props}
      onClick={() => {
        modals.open({
          size: 'xl',
          title: 'Link Solana Wallet',
          zIndex: 1,
          children: (
            <SolanaClusterProvider autoConnect={false}>
              <IdentityProviderSolanaLink refresh={refresh}>
                <IdentityUiSolanaLinkWizard
                  identities={identities ?? []}
                  refresh={() => {
                    refresh()
                    modals.closeAll()
                  }}
                />
              </IdentityProviderSolanaLink>
            </SolanaClusterProvider>
          ),
        })
      }}
    >
      {label ?? 'Link Solana Wallet'}
    </Button>
  )
}
