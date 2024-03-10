import { Paper } from '@mantine/core'
import { Community } from '@tokengator-mint/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { CommunityUiItem } from './community-ui-item'

export function CommunityUiGridItem({ community, to }: { community: Community; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <CommunityUiItem community={community} to={to} />
        <UiDebugModal data={community} />
      </UiGroup>
    </Paper>
  )
}
