import { UiStack } from '@pubkey-ui/core'
import { TokenGatorMinter } from '@tokengator-mint/sdk'

import { MinterUiCard } from './minter-ui-card'

export function MinterUiList({ items }: { items: TokenGatorMinter[] }) {
  return (
    <UiStack>
      {items.map((item, index) => (
        <MinterUiCard key={index} item={item} />
      ))}
    </UiStack>
  )
}
