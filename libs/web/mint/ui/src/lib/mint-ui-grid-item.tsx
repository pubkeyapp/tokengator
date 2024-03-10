import { Paper } from '@mantine/core'
import { Mint } from '@tokengator-mint/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { MintUiItem } from './mint-ui-item'

export function MintUiGridItem({ mint, to }: { mint: Mint; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <MintUiItem mint={mint} to={to} />
        <UiDebugModal data={mint} />
      </UiGroup>
    </Paper>
  )
}
