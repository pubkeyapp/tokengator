import { Accordion, Button, Group, NumberInput, SimpleGrid, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  toastError,
  toastSuccess,
  UiCard,
  UiDebugModal,
  UiGroup,
  UiInfo,
  UiLoader,
  UiPage,
  UiStack,
  UiWarning,
} from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { PresetActivity, TokenGatorActivityEntryInput, TokenGatorAsset } from '@tokengator/sdk'
import {
  useCreateAssetActivity,
  useCreateAssetActivityEvent,
  useGetAsset,
  useGetAssetActivity,
} from '@tokengator/web-asset-data-access'
import { AssetActivityUiEntryList, AssetActivityUiPoints, AssetUiItem } from '@tokengator/web-asset-ui'
import { useSdk } from '@tokengator/web-core-data-access'
import { SolanaExplorerIcon } from '@tokengator/web-solana-ui'
import { useParams } from 'react-router-dom'

export function useMetadataAll(account: string) {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['metadataAll', account],
    queryFn: async () => sdk.metadataAll({ account }).then((res) => res.data?.item),
  })
}

export function UserAssetDetailFeature() {
  const { account } = useParams() as { account: string }
  const queryAsset = useGetAsset({ account })
  const queryMetadata = useMetadataAll(account)

  const asset = queryAsset.data
  const metadata = queryMetadata.data
  const loading = queryAsset.isLoading || queryMetadata.isLoading

  return loading ? (
    <UiLoader />
  ) : asset ? (
    <UiPage
      rightAction={
        <Group>
          <SolanaExplorerIcon path={`account/${account}`} />
          <UiDebugModal data={{ asset, metadata }} />
        </Group>
      }
    >
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <UiCard title="Asset">
          <AssetUiItem asset={asset} />
        </UiCard>
        <UiCard title="Activity">
          <UserAssetActivities asset={asset} />
        </UiCard>
      </SimpleGrid>
    </UiPage>
  ) : (
    <UiWarning message={`Asset not found: ${account}`} />
  )
}

function UserAssetActivities({ asset }: { asset: TokenGatorAsset }) {
  const types = asset.activities || []
  return (
    <Accordion multiple variant="separated" defaultValue={types}>
      {types?.map((type) => (
        <Accordion.Item key={type} value={type}>
          <Accordion.Control>
            <UserAssetActivityLabel account={asset.account} type={type} />
          </Accordion.Control>
          <Accordion.Panel>
            <UserAssetActivityDetails account={asset.account} type={type} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

function UserAssetActivityLabel({ account, type }: { account: string; type: PresetActivity }) {
  const query = useGetAssetActivity({ account, type })
  const activity = query.data

  return query.isLoading ? (
    <UiLoader />
  ) : activity ? (
    <UiGroup>
      <Text size="xl">{activity.label}</Text>
      <AssetActivityUiPoints activity={activity} />
    </UiGroup>
  ) : (
    <UiInfo message={`Activity not found: ${type}`} />
  )
}

function UserAssetActivityDetails({ account, type }: { account: string; type: PresetActivity }) {
  const query = useGetAssetActivity({ account, type })
  const mutation = useCreateAssetActivity({ account, type })
  const mutationEvent = useCreateAssetActivityEvent({ account, type })
  const activity = query.data
  const entries = activity?.entries || []
  return query.isLoading ? (
    <UiLoader />
  ) : activity ? (
    <UiStack>
      <AssetActivityUiEntryList activity={activity} entries={entries} />
      <CreateEventFrom
        loading={mutationEvent.isPending}
        submit={(input) =>
          mutationEvent
            .mutateAsync(input)
            .then(async (res) => {
              toastSuccess('Event created')
              await query.refetch()
            })
            .catch((err) => {
              toastError(`Error creating event: ${err}`)
            })
        }
      />
    </UiStack>
  ) : (
    <UiStack>
      <Group justify="flex-end">
        <Button
          loading={mutation.isPending}
          onClick={() => {
            mutation
              .mutateAsync()
              .then(async (res) => {
                toastSuccess('List created')
                await query.refetch()
              })
              .catch((err) => {
                toastError(`Error creating list: ${err}`)
              })
          }}
        >
          Create List
        </Button>
      </Group>
    </UiStack>
  )
}

export function CreateEventFrom({
  loading,
  submit,
}: {
  loading: boolean
  submit: (input: TokenGatorActivityEntryInput) => void
}) {
  const form = useForm<TokenGatorActivityEntryInput>({
    initialValues: {
      message: '',
      url: '',
      points: 0,
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        submit({ ...values, points: Number(values.points) })
      })}
    >
      <UiStack>
        <TextInput
          required
          name="message"
          description="Message to display in the activity feed"
          label="Message"
          {...form.getInputProps('message')}
        />
        <NumberInput
          description="Points to award for this activity."
          name="points"
          label="Points"
          {...form.getInputProps('points')}
        />
        <TextInput
          description="URL to link to in the activity feed"
          name="url"
          label="URL"
          {...form.getInputProps('url')}
        />

        <Group justify="flex-end">
          <Button loading={loading} type="submit">
            Create Event
          </Button>
        </Group>
      </UiStack>
    </form>
  )
}
