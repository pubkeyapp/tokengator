import { ActionIcon, Tooltip } from '@mantine/core'
import { IconMoneybag } from '@tabler/icons-react'
import { Wallet } from '@tokengator-mint/sdk'

export function WalletUiRequestAirdrop({
  requestAirdrop,
  wallet,
}: {
  requestAirdrop: (account: string) => void
  wallet: Wallet
}) {
  return (
    <Tooltip label="Request airdrop">
      <ActionIcon
        onClick={() => requestAirdrop(wallet.publicKey)}
        title="Request airdrop"
        color="brand"
        variant="light"
        size="sm"
      >
        <IconMoneybag size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
