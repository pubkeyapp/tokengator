import { UiCard, UiDebug, UiStack } from '@pubkey-ui/core'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'

export function MinterUiAssets({ items }: { items: AccountInfo<ParsedAccountData>[] }) {
  if (!items.length) return null
  return (
    <UiStack>
      {items.map((item, index) => (
        <UiCard title={`Asset ${index}`} key={index}>
          <UiDebug data={item} />
        </UiCard>
      ))}
    </UiStack>
  )
}
