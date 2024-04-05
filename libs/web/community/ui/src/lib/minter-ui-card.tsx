import { Group } from '@mantine/core'
import { UiAnchor, UiCard, UiCardTitle, UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { SolanaExplorerIcon } from '@tokengator-mint/web-solana-ui'
import { ReactNode } from 'react'

export function MinterUiCard({ children, item }: { children?: ReactNode; item: any }) {
  return (
    <UiCard
      title={
        <UiGroup>
          <UiAnchor to={item.publicKey}>
            <UiCardTitle>{item.account?.name ?? item?.name ?? 'Unknown '}</UiCardTitle>
          </UiAnchor>
          <Group>
            <UiDebugModal data={item} />
            <SolanaExplorerIcon path={`account/${item.publicKey}`} />
          </Group>
        </UiGroup>
      }
    >
      {children}
    </UiCard>
  )
}
