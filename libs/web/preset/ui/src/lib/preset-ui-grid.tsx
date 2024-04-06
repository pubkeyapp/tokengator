import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { Preset } from '@tokengator/sdk'
import { gridLimits, UiPageLimit } from '@tokengator/web-core-ui'
import { DataTableProps } from 'mantine-datatable'
import { PresetUiGridItem } from './preset-ui-grid-item'

export function PresetUiGrid({
  presets = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  presets: Preset[]
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
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {presets.map((preset) => (
          <PresetUiGridItem key={preset.id} to={preset.id} preset={preset} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={presets} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
