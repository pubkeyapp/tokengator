import { Price } from '@tokengator-mint/sdk'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function PriceUiInfo({ price }: { price?: Price }) {
  if (!price) return null

  const items: UiInfoItems = [
    ['name', price.name],

    ['mint', price.mint],

    ['price', price.price],

    ['currency', price.currency],

    ['active', price.active],

    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(price.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(price.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
