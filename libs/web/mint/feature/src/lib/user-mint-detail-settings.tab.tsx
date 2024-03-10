import { useUserFindOneMint } from '@tokengator-mint/web-mint-data-access'
import { UserMintUiUpdateForm } from '@tokengator-mint/web-mint-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserMintDetailSettingsTab({ mintId }: { mintId: string }) {
  const { item, query, updateMint } = useUserFindOneMint({ mintId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Mint not found." />
  }

  return (
    <UiCard>
      <UserMintUiUpdateForm mint={item} submit={updateMint} />
    </UiCard>
  )
}
