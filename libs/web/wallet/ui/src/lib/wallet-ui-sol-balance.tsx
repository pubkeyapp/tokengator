import { Group, Text } from '@mantine/core'
import { UiLoader } from '@pubkey-ui/core'
import { formatSol, Wallet } from '@tokengator/sdk'
import { useSolanaGetBalance } from '@tokengator/web-solana-data-access'

export function WalletUiSolBalance({ wallet }: { wallet: Wallet }) {
  const query = useSolanaGetBalance({ account: wallet.publicKey })

  return query.isLoading ? (
    <Group pt={6} pb={5} pr="md">
      <UiLoader type="dots" size="xs" />
    </Group>
  ) : (
    <Text
      title="Click to refresh"
      size="lg"
      fw="bold"
      onClick={() => query.refetch()}
      style={{
        cursor: 'pointer',
      }}
    >
      {formatSol(query.data ?? '0')}
    </Text>
  )
}
