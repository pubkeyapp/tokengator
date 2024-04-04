import { Button, Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { UiPageLimit, UiSearchField } from '@tokengator-mint/web-core-ui'
import { useAdminFindManyWallet } from '@tokengator-mint/web-wallet-data-access'
import { AdminWalletUiTable } from '@tokengator-mint/web-wallet-ui'
import { Link } from 'react-router-dom'

export default function AdminWalletListFeature({ communityId }: { communityId: string }) {
  const { deleteWallet, items, pagination, query, setSearch } = useAdminFindManyWallet({
    limit: 10,
    communityId,
  })

  return (
    <UiPage
      title="Wallets"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search wallet" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminWalletUiTable
          deleteWallet={(wallet) => {
            if (!window.confirm('Are you sure?')) return
            return deleteWallet(wallet.id)
          }}
          wallets={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No wallets found" />
      )}
    </UiPage>
  )
}
