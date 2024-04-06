import { AspectRatio, Image, SimpleGrid } from '@mantine/core'
import { UiCard, UiDebug, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@tokengator/web-core-data-access'
import { useParams, useRoutes } from 'react-router-dom'

export default function UserAssetRoutes() {
  return useRoutes([
    { path: '', element: <UserAssetListFeature /> },
    { path: ':account/*', element: <UserAssetDetailFeature /> },
  ])
}

function UserAssetListFeature() {
  return <UiInfo title="Work in Progress" message="TBD" />
}

function useMetadataAll(account: string) {
  const sdk = useSdk()

  return useQuery({
    queryKey: [],
    queryFn: async () => sdk.metadataAll({ account }).then((res) => res.data?.item),
  })
}

function UserAssetDetailFeature() {
  const { account } = useParams() as { account: string }
  const query = useMetadataAll(account)

  const item = query.data

  return query.isLoading ? (
    <UiLoader />
  ) : (
    <UiPage title={item.json?.name}>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <UiCard>
          <AspectRatio ratio={1}>
            <Image src={item.json?.image} />
          </AspectRatio>
        </UiCard>
        <UiCard>ACTIVITY LISTS</UiCard>
      </SimpleGrid>
      <UiDebug data={query.data} open />
    </UiPage>
  )
}
