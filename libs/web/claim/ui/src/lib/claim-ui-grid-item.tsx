import { Paper } from '@mantine/core'
import { Claim } from '@tokengator-mint/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
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
