import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { useUserFindOneWallet } from '@tokengator-mint/web-wallet-data-access'
import { UserWalletUiUpdateForm } from '@tokengator-mint/web-wallet-ui'

export function UserWalletDetailSettingsTab({ publicKey }: { publicKey: string }) {
  const { item, query, updateWallet } = useUserFindOneWallet({ publicKey })

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
