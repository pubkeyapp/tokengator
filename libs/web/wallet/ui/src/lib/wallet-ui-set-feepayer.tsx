import { ActionIcon, Tooltip } from '@mantine/core'
import { IconSelector } from '@tabler/icons-react'
import { Wallet } from '@tokengator-mint/sdk'

export function WalletUiSetFeepayer({
  setFeepayer,
  wallet,
}: {
  setFeepayer: (publicKey: string) => void
  wallet: Wallet
}) {
  return (
    <Tooltip label={wallet.feePayer ? 'Fee payer' : 'Set as fee payer'}>
      <ActionIcon
        disabled={wallet.feePayer}
        onClick={() => setFeepayer(wallet.publicKey)}
        title="Set as fee payer"
        color="brand"
        variant="light"
        size="sm"
      >
        <IconSelector size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
