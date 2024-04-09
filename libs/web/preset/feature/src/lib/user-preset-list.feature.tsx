import { Group, Text } from '@mantine/core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage, UiStack } from '@pubkey-ui/core'
import { UiSearchField } from '@tokengator/web-core-ui'
import { useUserFindManyPreset } from '@tokengator/web-preset-data-access'
import { PresetUiGrid } from '@tokengator/web-preset-ui'

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
      <UiInfo
        variant="outline"
        title="About Presets"
        message={
          <UiStack>
            <Text>
              Presets are a pre-defined set of settings that define how the collection and the assets are created and
              behave.
            </Text>
          </UiStack>
        }
      />

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
