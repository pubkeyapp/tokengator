import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { Community } from '@tokengator-mint/sdk'
import { gridLimits, UiPageLimit } from '@tokengator-mint/web-core-ui'
import { DataTableProps } from 'mantine-datatable'
import { CommunityUiGridItem } from './community-ui-grid-item'

export function CommunityUiGrid({
  communities = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  communities: Community[]
  page: DataTableProps['page']
  totalRecords: number
  onPageChange: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  const totalPages = totalRecords / limit + 1
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {communities.map((community) => (
          <CommunityUiGridItem
            key={community.id}
            to={community.viewUrl ?? community.publicUrl ?? ''}
            community={community}
          />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={communities} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
