import { SimpleGrid } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { Price } from '@tokengator-mint/sdk'
import { PriceUiGridItem } from './price-ui-grid-item'

export function PriceUiGrid({ prices = [] }: { prices: Price[] }) {
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: prices.length }} spacing="md">
        {prices.map((price) => (
          <PriceUiGridItem key={price.id} price={price} />
        ))}
      </SimpleGrid>
    </UiStack>
  )
}
