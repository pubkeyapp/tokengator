import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiGroup, UiLoader, UiStack, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useUserFindOneWallet } from '@tokengator-mint/web-wallet-data-access'
import { WalletUiItem, WalletUiSolTokenAccounts, WalletUiSolTransactions } from '@tokengator-mint/web-wallet-ui'
import { useParams } from 'react-router-dom'

import { UserWalletDetailInfoTab } from './user-wallet-detail-info.tab'
import { UserWalletDetailSettingsTab } from './user-wallet-detail-settings.tab'

export default function UserWalletDetailFeature() {
  const { walletId } = useParams<{ walletId: string }>() as { walletId: string }
  const { item, query } = useUserFindOneWallet({ walletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Wallet not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <UserWalletDetailInfoTab walletId={walletId} />,
    },
    {
      path: 'transactions',
      label: 'Transactions',
      element: <WalletUiSolTransactions wallet={item} />,
    },
    {
      path: 'token-accounts',
      label: 'Token Accounts',
      element: <WalletUiSolTokenAccounts wallet={item} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <UserWalletDetailSettingsTab walletId={walletId} />,
    },
  ]

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <WalletUiItem wallet={item} />
        </Group>
        <UiDebugModal data={item} />
      </UiGroup>
      <UiTabRoutes tabs={tabs} />
    </UiStack>
  )
}
