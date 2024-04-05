import { UiStack } from '@pubkey-ui/core'

import { MinterUiCard } from './minter-ui-card'

export function MinterUiList({ items }: { items: any[] }) {
  return (
    <UiStack>
      {items.map((item, index) => (
        <MinterUiCard key={index} item={item} />
      ))}
    </UiStack>
  )
}
