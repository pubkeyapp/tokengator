import { Group, type GroupProps } from '@mantine/core'
import { CommunityMember } from '@tokengator-mint/sdk'
import { UserUiItem } from '@tokengator-mint/web-user-ui'
import { CommunityMemberUiRoleBadge } from './community-member-ui-role-badge'

export function CommunityMemberUiItem({
  groupProps,
  communityMember,
  to,
}: {
  groupProps?: GroupProps
  communityMember?: CommunityMember
  to?: string | null
}) {
  if (!communityMember) return null

  return (
    <Group gap="sm" {...groupProps}>
      {communityMember.user ? (
        <UserUiItem user={communityMember.user} to={to ?? communityMember.user.profileUrl} />
      ) : null}
      <CommunityMemberUiRoleBadge role={communityMember.role} />
    </Group>
  )
}
