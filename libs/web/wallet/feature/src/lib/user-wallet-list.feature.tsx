import { Button, Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { UiSearchField } from '@tokengator-mint/web-core-ui'
import { useUserFindManyWallet } from '@tokengator-mint/web-wallet-data-access'
import { WalletUiGrid } from '@tokengator-mint/web-wallet-ui'
import { Link } from 'react-router-dom'

export default function UserWalletListFeature({ communityId }: { communityId: string }) {
  const { items, pagination, query, setSearch } = useUserFindManyWallet({
    limit: 12,
    communityId,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search wallet" setSearch={setSearch} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <WalletUiGrid
          wallets={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No wallets found" />
      )}
    </UiStack>
  )
}
