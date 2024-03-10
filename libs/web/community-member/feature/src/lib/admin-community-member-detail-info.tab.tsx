import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { useAdminFindOneCommunityMember } from '@tokengator-mint/web-community-member-data-access'
import { CommunityMemberUiInfo } from '@tokengator-mint/web-community-member-ui'

export function AdminCommunityMemberDetailInfoTab({ communityMemberId }: { communityMemberId: string }) {
  const { item, query } = useAdminFindOneCommunityMember({ communityMemberId })

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
