import { Button, Group, Select } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { Community, Preset, TokenGatorMinter } from '@tokengator/sdk'
import { useUserCreateMintFromPreset, useUserGetMintersByCommunity } from '@tokengator/web-community-data-access'
import { MinterUiList } from '@tokengator/web-community-ui'
import { useSdk } from '@tokengator/web-core-data-access'
import { useUserFindManyPreset } from '@tokengator/web-preset-data-access'
import { useState } from 'react'

function useUserDeleteMinter({ communitySlug }: { communitySlug: string }) {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (account: string) => sdk.userDeleteMinter({ account, communitySlug }).then((res) => res.data.deleted),
  })
}

export function UserCommunityDetailMinterListTab({ community }: { community: Community }) {
  const createMinter = useUserCreateMintFromPreset({ slug: community.slug })
  const mutationDelete = useUserDeleteMinter({ communitySlug: community.slug })
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
        <MinterUiList
          items={items ?? []}
          deleteMinter={async (item) => {
            mutationDelete.mutateAsync(item).then(() => query.refetch())
          }}
        />
      ) : (
        <UiInfo message="No collections found" />
      )}
      <Group justify="flex-end">
        <UiDebugModal data={{ items, presets }} />
        <Button
          onClick={() => {
            modals.open({
              centered: true,
              title: 'Create Collection',
              children: (
                <Modal
                  presets={presets}
                  createMinter={async ({ presetId }) =>
                    createMinter.mutateAsync({ presetId }).then(async () => {
                      modals.closeAll()
                      await query.refetch()
                    })
                  }
                  loading={createMinter.isPending}
                />
              ),
            })
          }}
        >
          Create Collection
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
  const presetOptions = presets.map((preset) => ({ value: preset.id, label: preset.name, disabled: !preset.enabled }))
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
      <Group justify="flex-end">
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
      </Group>
    </UiStack>
  )
}
