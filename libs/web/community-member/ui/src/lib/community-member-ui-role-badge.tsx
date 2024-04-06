import { Badge } from '@mantine/core'
import { useUiColorScheme } from '@pubkey-ui/core'
import { CommunityMemberRole } from '@tokengator/sdk'

export const COMMUNITY_MEMBER_ROLE_COLORS: Record<CommunityMemberRole, string> = {
  [CommunityMemberRole.Admin]: 'pink',
  [CommunityMemberRole.Member]: 'blue',
}

export function CommunityMemberUiRoleBadge({ role }: { role: CommunityMemberRole }) {
  const { colorScheme } = useUiColorScheme()
  return (
    <Badge color={COMMUNITY_MEMBER_ROLE_COLORS[role]} variant={colorScheme === 'dark' ? 'light' : 'outline'}>
      {role}
    </Badge>
  )
}
