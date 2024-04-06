import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { Wallet } from '@tokengator/sdk'
import { gridLimits, UiPageLimit } from '@tokengator/web-core-ui'
import { DataTableProps } from 'mantine-datatable'
import { WalletUiGridItem } from './wallet-ui-grid-item'

export function WalletUiGrid({
  wallets = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  requestAirdrop,
  setFeepayer,
  setLimit,
  setPage,
}: {
  wallets: Wallet[]
  page: DataTableProps['page']
  totalRecords: number
  onPageChange: (page: number) => void
  limit: number
  requestAirdrop: (account: string) => void
  setFeepayer: (publicKey: string) => void
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  const totalPages = totalRecords / limit + 1
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1 }} spacing="md">
        {wallets.map((wallet) => (
          <WalletUiGridItem
            key={wallet.id}
            to={wallet.publicKey}
            wallet={wallet}
            setFeepayer={setFeepayer}
            requestAirdrop={requestAirdrop}
          />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={wallets} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
