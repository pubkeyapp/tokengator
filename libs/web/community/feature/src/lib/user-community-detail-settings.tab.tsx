import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { useUserFindOneCommunity } from '@tokengator/web-community-data-access'
import { UserCommunityUiUpdateForm } from '@tokengator/web-community-ui'

export function UserCommunityDetailSettingsTab({ slug }: { slug: string }) {
  const { item, query, updateCommunity } = useUserFindOneCommunity({ slug })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiCard>
      <UserCommunityUiUpdateForm community={item} submit={updateCommunity} />
    </UiCard>
  )
}
