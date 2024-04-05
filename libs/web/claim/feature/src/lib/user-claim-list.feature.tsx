import { Button, Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { useUserFindManyClaim } from '@tokengator-mint/web-claim-data-access'
import { UserClaimUiTable } from '@tokengator-mint/web-claim-ui'
import { UiSearchField } from '@tokengator-mint/web-core-ui'
import { Link } from 'react-router-dom'

export default function UserClaimListFeature({ communityId, minter }: { communityId: string; minter: string }) {
  const { deleteClaim, items, pagination, query, setSearch } = useUserFindManyClaim({
    limit: 100,
    communityId,
    minter,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search claim" setSearch={setSearch} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserClaimUiTable
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
    </UiStack>
  )
}
