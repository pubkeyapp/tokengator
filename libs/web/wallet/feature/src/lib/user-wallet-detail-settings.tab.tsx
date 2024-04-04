import { useUserFindOneWallet } from '@tokengator-mint/web-wallet-data-access'
import { UserWalletUiUpdateForm } from '@tokengator-mint/web-wallet-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserWalletDetailSettingsTab({ walletId }: { walletId: string }) {
  const { item, query, updateWallet } = useUserFindOneWallet({ walletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Wallet not found." />
  }

  return (
    <UiCard>
      <UserWalletUiUpdateForm wallet={item} submit={updateWallet} />
    </UiCard>
  )
}
