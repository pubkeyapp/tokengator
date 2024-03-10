import { useAdminFindOneMint } from '@tokengator-mint/web-mint-data-access'
import { AdminMintUiUpdateForm } from '@tokengator-mint/web-mint-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminMintDetailSettingsTab({ mintId }: { mintId: string }) {
  const { item, query, updateMint } = useAdminFindOneMint({ mintId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Mint not found." />
  }

  return (
    <UiCard>
      <AdminMintUiUpdateForm mint={item} submit={updateMint} />
    </UiCard>
  )
}
