import { Accordion, Group, SimpleGrid, Text } from '@mantine/core'
import { UiCard, UiDebugModal, UiGroup, UiInfo, UiLoader, UiPage, UiWarning } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { Asset, AssetActivityType } from '@tokengator/sdk'
import { useGetAsset, useGetAssetActivity } from '@tokengator/web-asset-data-access'
import { AssetActivityUiEntryList, AssetActivityUiPoints, AssetUiItem } from '@tokengator/web-asset-ui'
import { useSdk } from '@tokengator/web-core-data-access'
import { SolanaExplorerIcon } from '@tokengator/web-solana-ui'
import { useParams } from 'react-router-dom'

export function useMetadataAll(account: string) {
  const sdk = useSdk()

  return useQuery({
    queryKey: [],
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

function UserAssetActivities({ asset }: { asset: Asset }) {
  return (
    <Accordion multiple variant="separated">
      {asset.lists?.map((type) => (
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

function UserAssetActivityLabel({ account, type }: { account: string; type: AssetActivityType }) {
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

function UserAssetActivityDetails({ account, type }: { account: string; type: AssetActivityType }) {
  const query = useGetAssetActivity({ account, type })
  const activity = query.data
  const entries = activity?.entries || []
  return query.isLoading ? (
    <UiLoader />
  ) : activity ? (
    <AssetActivityUiEntryList activity={activity} entries={entries} />
  ) : (
    <UiInfo message={`Activity not found: ${type}`} />
  )
}
