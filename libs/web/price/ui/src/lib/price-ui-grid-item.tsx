import { Paper } from '@mantine/core'
import { Price } from '@tokengator/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { PriceUiItem } from './price-ui-item'

export function PriceUiGridItem({ price, to }: { price: Price; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <PriceUiItem price={price} to={to} />
        <UiDebugModal data={price} />
      </UiGroup>
    </Paper>
  )
}
