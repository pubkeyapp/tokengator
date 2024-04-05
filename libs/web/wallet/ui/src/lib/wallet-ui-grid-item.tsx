import { Group, Paper, Stack } from '@mantine/core'
import { UiCopy, UiGroup } from '@pubkey-ui/core'
import { Wallet } from '@tokengator-mint/sdk'
import { SolanaExplorerIcon } from '@tokengator-mint/web-solana-ui'
import { WalletUiItem } from './wallet-ui-item'
import { WalletUiRequestAirdrop } from './wallet-ui-request-airdrop'
import { WalletUiSetFeepayer } from './wallet-ui-set-feepayer'
import { WalletUiSolBalance } from './wallet-ui-sol-balance'

export function WalletUiGridItem({
  requestAirdrop,
  setFeepayer,
  to,
  wallet,
}: {
  requestAirdrop: (account: string) => void
  setFeepayer: (publicKey: string) => void
  to?: string
  wallet: Wallet
}) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <WalletUiItem wallet={wallet} to={to} />
        <Stack gap={0} align="end">
          <WalletUiSolBalance wallet={wallet} />
          <Group gap={4}>
            <WalletUiRequestAirdrop requestAirdrop={requestAirdrop} wallet={wallet} />
            <WalletUiSetFeepayer setFeepayer={setFeepayer} wallet={wallet} />
            <UiCopy text={wallet.publicKey} tooltip={'Copy Address'} size="sm" />
            <SolanaExplorerIcon path={`/address/${wallet.publicKey}`} />
          </Group>
        </Stack>
      </UiGroup>
    </Paper>
  )
}
