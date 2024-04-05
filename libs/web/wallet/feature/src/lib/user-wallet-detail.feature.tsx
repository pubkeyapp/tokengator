import { Group } from '@mantine/core'
import { UiBack, UiCard, UiCopy, UiDebugModal, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { useSolanaRequestAirdrop } from '@tokengator-mint/web-solana-data-access'
import { SolanaExplorerIcon } from '@tokengator-mint/web-solana-ui'
import { useUserFindOneWallet, useUserSetWalletFeepayer } from '@tokengator-mint/web-wallet-data-access'
import {
  WalletUiItem,
  WalletUiRequestAirdrop,
  WalletUiSetFeepayer,
  WalletUiSolBalance,
  WalletUiSolTokenAccounts,
  WalletUiSolTransactions,
} from '@tokengator-mint/web-wallet-ui'
import { useParams } from 'react-router-dom'

import { UserWalletDetailSettingsTab } from './user-wallet-detail-settings.tab'

export default function UserWalletDetailFeature() {
  const { publicKey } = useParams<{ publicKey: string }>() as { publicKey: string }
  const { item, query } = useUserFindOneWallet({ publicKey })
  const requestAirdropMutation = useSolanaRequestAirdrop()
  const setFeepayerMutation = useUserSetWalletFeepayer()

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Wallet not found." />
  }

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <WalletUiItem wallet={item} />
        </Group>
        <Group gap="xs">
          <WalletUiSolBalance wallet={item} />
          <UiDebugModal data={item} />
          <WalletUiRequestAirdrop
            requestAirdrop={(account) => requestAirdropMutation.mutateAsync({ account })}
            wallet={item}
          />
          <WalletUiSetFeepayer
            setFeepayer={() => setFeepayerMutation.mutateAsync({ publicKey: item.publicKey })}
            wallet={item}
          />
          <UiCopy text={item.publicKey} tooltip={'Copy Address'} size="sm" />
          <SolanaExplorerIcon path={`/address/${item.publicKey}`} />
        </Group>
      </UiGroup>

      <UiStack>
        <UiCard>
          <WalletUiSolTokenAccounts wallet={item} />
        </UiCard>
        <UiCard>
          <WalletUiSolTransactions wallet={item} />
        </UiCard>
        <UserWalletDetailSettingsTab publicKey={publicKey} />
      </UiStack>
    </UiStack>
  )
}
