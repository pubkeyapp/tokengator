import { Paper } from '@mantine/core'
import { UiGroup } from '@pubkey-ui/core'
import { Community } from '@tokengator/sdk'
import { CommunityUiItem } from './community-ui-item'

export function CommunityUiGridItem({ community, to }: { community: Community; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <CommunityUiItem community={community} to={to} />
      </UiGroup>
    </Paper>
  )
}
