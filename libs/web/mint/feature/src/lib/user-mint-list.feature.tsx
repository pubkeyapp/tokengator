import { Button, Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { UiSearchField } from '@tokengator-mint/web-core-ui'
import { useUserFindManyMint } from '@tokengator-mint/web-mint-data-access'
import { MintUiGrid } from '@tokengator-mint/web-mint-ui'
import { Link } from 'react-router-dom'

export function UserMintListFeature({ communityId }: { communityId: string }) {
  const { items, pagination, query, setSearch } = useUserFindManyMint({
    communityId,
    limit: 12,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search mint" setSearch={setSearch} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <MintUiGrid
          mints={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No mints found" />
      )}
    </UiStack>
  )
}
