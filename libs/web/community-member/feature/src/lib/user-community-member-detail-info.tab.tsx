import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { useUserFindOneCommunityMember } from '@tokengator-mint/web-community-member-data-access'
import { CommunityMemberUiInfo } from '@tokengator-mint/web-community-member-ui'

export function UserCommunityMemberDetailInfoTab({ communityMemberId }: { communityMemberId: string }) {
  const { item, query } = useUserFindOneCommunityMember({ communityMemberId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="CommunityMember not found." />
  }

  return (
    <UiCard>
      <CommunityMemberUiInfo communityMember={item} />
    </UiCard>
  )
}
