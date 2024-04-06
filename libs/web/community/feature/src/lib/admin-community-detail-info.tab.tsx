import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { useAdminFindOneCommunity } from '@tokengator/web-community-data-access'
import { CommunityUiInfo } from '@tokengator/web-community-ui'

export function AdminCommunityDetailInfoTab({ communityId }: { communityId: string }) {
  const { item, query } = useAdminFindOneCommunity({ communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiCard>
      <CommunityUiInfo community={item} />
    </UiCard>
  )
}
