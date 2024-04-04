import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { UiSearchField } from '@tokengator-mint/web-core-ui'
import { useUserFindManyPreset } from '@tokengator-mint/web-preset-data-access'
import { PresetUiGrid } from '@tokengator-mint/web-preset-ui'

export default function UserPresetListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyPreset({
    limit: 12,
  })

  return (
    <UiPage
      title="Presets"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search preset" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <PresetUiGrid
          presets={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No presets found" />
      )}
    </UiPage>
  )
}
