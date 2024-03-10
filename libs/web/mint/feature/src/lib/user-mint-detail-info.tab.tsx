import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { useUserFindOneMint } from '@tokengator-mint/web-mint-data-access'
import { MintUiInfo } from '@tokengator-mint/web-mint-ui'

export function UserMintDetailInfoTab({ mintId }: { mintId: string }) {
  const { item, query } = useUserFindOneMint({ mintId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Mint not found." />
  }

  return (
    <UiCard>
      <MintUiInfo mint={item} />
    </UiCard>
  )
}
