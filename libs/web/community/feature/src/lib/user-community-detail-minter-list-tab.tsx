import { Button, Group, Select } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiDebug, UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Community, Preset, TokenGatorMinter } from '@tokengator/sdk'
import { useUserFindOneCommunity, useUserGetMintersByCommunity } from '@tokengator/web-community-data-access'
import { MinterUiList } from '@tokengator/web-community-ui'
import { useUserFindManyPreset } from '@tokengator/web-preset-data-access'
import { useState } from 'react'

export function UserCommunityDetailMinterListTab({ community }: { community: Community }) {
  const { createMinter } = useUserFindOneCommunity({ slug: community.slug })
  const query = useUserGetMintersByCommunity({ slug: community.slug })
  const { items: presets } = useUserFindManyPreset()
  const items: TokenGatorMinter[] = query.data ?? []

  return query.isLoading ? (
    <UiLoader />
  ) : (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : items.length ? (
        <MinterUiList items={items ?? []} />
      ) : (
        <UiInfo message="No minters found" />
      )}
      <Group justify="flex-end">
        <UiDebugModal data={{ items, presets }} />
        <Button
          onClick={() => {
            modals.open({
              title: 'Create Collection',
              children: (
                <Modal
                  presets={presets}
                  createMinter={async ({ presetId }) =>
                    createMinter({ presetId }).then(async () => {
                      modals.closeAll()
                      await query.refetch()
                    })
                  }
                  loading={query.isPending}
                />
              ),
            })
          }}
        >
          Create
        </Button>
      </Group>
    </UiStack>
  )
}

function Modal({
  createMinter,
  loading,
  presets,
}: {
  presets: Preset[]
  createMinter: ({ presetId }: { presetId: string }) => Promise<void>
  loading: boolean
}) {
  const [presetId, setPresetId] = useState<string | null>(null)
  const presetOptions = presets.map((preset) => ({ value: preset.id, label: preset.name }))
  return (
    <UiStack>
      <Select
        value={presetId || ''}
        data={presetOptions}
        onChange={(value) => {
          setPresetId(value)
        }}
        placeholder="Select preset"
      />

      <Button
        disabled={!presetId}
        loading={loading}
        onClick={() => {
          if (!presetId) {
            return
          }
          createMinter({ presetId }).then(() => {
            modals.closeAll()
          })
        }}
      >
        Create Collection
      </Button>
      <UiDebug data={{ presetId }} />
    </UiStack>
  )
}
