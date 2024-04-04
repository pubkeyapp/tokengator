import { Paper } from '@mantine/core'
import { Wallet } from '@tokengator-mint/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { WalletUiItem } from './wallet-ui-item'

export function WalletUiGridItem({ wallet, to }: { wallet: Wallet; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <WalletUiItem wallet={wallet} to={to} />
        <UiDebugModal data={wallet} />
      </UiGroup>
    </Paper>
  )
}
