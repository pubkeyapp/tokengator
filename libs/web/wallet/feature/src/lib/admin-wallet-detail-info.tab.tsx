import { useAdminFindOneWallet } from '@tokengator-mint/web-wallet-data-access'
import { WalletUiInfo } from '@tokengator-mint/web-wallet-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminWalletDetailInfoTab({ walletId }: { walletId: string }) {
  const { item, query } = useAdminFindOneWallet({ walletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Wallet not found." />
  }

  return (
    <UiCard>
      <WalletUiInfo wallet={item} />
    </UiCard>
  )
}
