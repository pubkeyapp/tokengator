import { useAdminFindOneWallet } from '@tokengator-mint/web-wallet-data-access'
import { AdminWalletUiUpdateForm } from '@tokengator-mint/web-wallet-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminWalletDetailSettingsTab({ walletId }: { walletId: string }) {
  const { item, query, updateWallet } = useAdminFindOneWallet({ walletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Wallet not found." />
  }

  return (
    <UiCard>
      <AdminWalletUiUpdateForm wallet={item} submit={updateWallet} />
    </UiCard>
  )
}
