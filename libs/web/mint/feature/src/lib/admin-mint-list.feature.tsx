import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { UiPageLimit, UiSearchField } from '@tokengator-mint/web-core-ui'
import { useAdminFindManyMint } from '@tokengator-mint/web-mint-data-access'
import { AdminMintUiTable } from '@tokengator-mint/web-mint-ui'

export function AdminMintListFeature({ communityId }: { communityId: string }) {
  const { deleteMint, items, pagination, query, setSearch } = useAdminFindManyMint({
    communityId,
    limit: 10,
  })

  return (
    <UiPage
      title="Mints"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search mint" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminMintUiTable
          deleteMint={(mint) => {
            if (!window.confirm('Are you sure?')) return
            return deleteMint(mint.id)
          }}
          mints={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No mints found" />
      )}
    </UiPage>
  )
}
