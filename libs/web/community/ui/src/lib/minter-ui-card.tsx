import { UiAnchor, UiCard, UiCardTitle, UiDebug } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function MinterUiCard({ children, item }: { children?: ReactNode; item: any }) {
  return (
    <UiCard
      title={
        <UiAnchor to={item.publicKey}>
          <UiCardTitle>{item.account?.name ?? item?.name ?? 'Unknown '}</UiCardTitle>
        </UiAnchor>
      }
    >
      {children}
      <UiDebug data={item} />
    </UiCard>
  )
}
