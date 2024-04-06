import { Group } from '@mantine/core'
import { UiAnchor, UiCard, UiCardTitle, UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { TokenGatorMinter } from '@tokengator/sdk'
import { SolanaExplorerIcon } from '@tokengator/web-solana-ui'
import { ReactNode } from 'react'

export function MinterUiCard({ children, item }: { children?: ReactNode; item: TokenGatorMinter }) {
  return (
    <UiCard
      title={
        <UiGroup>
          <UiAnchor to={item.publicKey}>
            <UiCardTitle>{item?.name ?? 'Unknown '}</UiCardTitle>
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
