import { Button, Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { UiPageLimit, UiSearchField } from '@tokengator-mint/web-core-ui'
import { useAdminFindManyPreset } from '@tokengator-mint/web-preset-data-access'
import { AdminPresetUiTable } from '@tokengator-mint/web-preset-ui'
import { Link } from 'react-router-dom'

export default function AdminPresetListFeature() {
  const { deletePreset, items, pagination, query, setSearch } = useAdminFindManyPreset({
    limit: 10,
  })

  return (
    <UiPage
      title="Presets"
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
        <UiSearchField placeholder="Search preset" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminPresetUiTable
          deletePreset={(preset) => {
            if (!window.confirm('Are you sure?')) return
            return deletePreset(preset.id)
          }}
          presets={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No presets found" />
      )}
    </UiPage>
  )
}
