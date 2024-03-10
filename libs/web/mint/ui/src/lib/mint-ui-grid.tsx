import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { Mint } from '@tokengator-mint/sdk'
import { gridLimits, UiPageLimit } from '@tokengator-mint/web-core-ui'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { MintUiGridItem } from './mint-ui-grid-item'

export function MintUiGrid({
  mints = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  mints: Mint[]
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
        {mints.map((mint) => (
          <MintUiGridItem key={mint.id} to={mint.id} mint={mint} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={mints} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
