import { Button, Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { useAdminFindManyClaim } from '@tokengator/web-claim-data-access'
import { AdminClaimUiTable } from '@tokengator/web-claim-ui'
import { UiPageLimit, UiSearchField } from '@tokengator/web-core-ui'
import { Link } from 'react-router-dom'

export default function AdminClaimListFeature({ communityId }: { communityId: string }) {
  const { deleteClaim, items, pagination, query, setSearch } = useAdminFindManyClaim({
    limit: 10,
    communityId,
  })

  return (
    <UiPage
      title="Claims"
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
        <UiSearchField placeholder="Search claim" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminClaimUiTable
          deleteClaim={(claim) => {
            if (!window.confirm('Are you sure?')) return
            return deleteClaim(claim.id)
          }}
          claims={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No claims found" />
      )}
    </UiPage>
  )
}
