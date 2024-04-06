import { Paper } from '@mantine/core'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { Claim } from '@tokengator/sdk'
import { ClaimUiItem } from './claim-ui-item'

export function ClaimUiGridItem({ claim, to }: { claim: Claim; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <ClaimUiItem claim={claim} to={to} />
        <UiDebugModal data={claim} />
      </UiGroup>
    </Paper>
  )
}
