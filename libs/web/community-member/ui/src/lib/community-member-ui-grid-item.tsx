import { Paper } from '@mantine/core'
import { CommunityMember } from '@tokengator/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { CommunityMemberUiItem } from './community-member-ui-item'

export function CommunityMemberUiGridItem({ communityMember, to }: { communityMember: CommunityMember; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <CommunityMemberUiItem communityMember={communityMember} to={to} />
        <UiDebugModal data={communityMember} />
      </UiGroup>
    </Paper>
  )
}
