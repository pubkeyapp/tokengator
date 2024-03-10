import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'
import { CommunityMember } from '@tokengator-mint/sdk'
import { CommunityMemberUiRoleBadge } from './community-member-ui-role-badge'

export function CommunityMemberUiInfo({ communityMember }: { communityMember?: CommunityMember }) {
  if (!communityMember) return null

  const items: UiInfoItems = [
    ['Role', <CommunityMemberUiRoleBadge role={communityMember.role} />],
    ['Community ID', communityMember.communityId],
    ['User ID', communityMember.userId],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(communityMember.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(communityMember.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
