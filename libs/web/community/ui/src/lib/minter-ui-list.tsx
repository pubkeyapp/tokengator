import { UiStack } from '@pubkey-ui/core'

import { MinterUiCard } from './minter-ui-card'

export function MinterUiList({ items }: { items: any[] }) {
  return (
    <UiStack>
      {items.map((item) => (
        <MinterUiCard key={item.id} item={item} />
      ))}
    </UiStack>
  )
}
