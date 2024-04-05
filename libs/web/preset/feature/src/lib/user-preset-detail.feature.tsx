import { Button, Group, Select } from '@mantine/core'
import {
  UiBack,
  UiDebug,
  UiDebugModal,
  UiError,
  UiLoader,
  UiPage,
  UiStack,
  UiTabRoute,
  UiTabRoutes,
} from '@pubkey-ui/core'
import { useUserFindManyCommunity } from '@tokengator-mint/web-community-data-access'
import { useUserFindOnePreset } from '@tokengator-mint/web-preset-data-access'
import { PresetUiItem } from '@tokengator-mint/web-preset-ui'
import { UserPriceFeature } from '@tokengator-mint/web-price-feature'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserPresetDetailInfoTab } from './user-preset-detail-info.tab'

export default function UserPresetDetailFeature() {
  const { presetId } = useParams<{ presetId: string }>() as { presetId: string }
  const { item, query } = useUserFindOnePreset({ presetId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Preset not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <UserPresetDetailInfoTab presetId={presetId} />,
    },
    {
      path: 'prices',
      label: 'Prices',
      element: <UserPriceFeature presetId={presetId} />,
    },
    {
      path: 'create',
      label: 'Create',
      element: <CreateMinterComponent presetId={presetId} />,
    },
  ]

  return (
    <UiPage
      title={<PresetUiItem preset={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}

function CreateMinterComponent({ presetId }: { presetId: string }) {
  const { createMinter } = useUserFindOnePreset({ presetId })
  const { items } = useUserFindManyCommunity()
  const [communitySlug, setCommunitySlug] = useState<string | null>(null)

  const options = items.map((item) => ({ value: item.slug, label: item.name }))

  return (
    <UiStack>
      <div>Here we are going to create a minter from the Preset</div>

      <Select
        data={options}
        label="Community"
        placeholder="Select community"
        value={communitySlug || ''}
        onChange={(value) => setCommunitySlug(value)}
      />

      <Group justify="flex-end">
        <Button
          disabled={!communitySlug}
          onClick={() => {
            if (!communitySlug) {
              return
            }
            return createMinter({ communitySlug })
          }}
        >
          Create Minter
        </Button>
      </Group>

      <UiDebug data={{ communitySlug, items }} open />
    </UiStack>
  )
}
