import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useAnonFindOneCommunity } from '@tokengator-mint/web-community-data-access'

import { CommunityUiInfo, CommunityUiItem } from '@tokengator-mint/web-community-ui'
import { useParams } from 'react-router-dom'

export function AnonCommunityDetailFeature() {
  const { slug } = useParams<{ slug: string }>() as { slug: string }
  const { item, query } = useAnonFindOneCommunity({ slug })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiPage
      title={<CommunityUiItem community={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <CommunityUiInfo community={item} />
    </UiPage>
  )
}
