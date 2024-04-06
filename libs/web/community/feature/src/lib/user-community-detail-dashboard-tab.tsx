import { UiCard } from '@pubkey-ui/core'
import { Community } from '@tokengator/sdk'
import { CommunityUiInfo } from '@tokengator/web-community-ui'

export function UserCommunityDetailDashboardTab({ community }: { community: Community }) {
  return (
    <UiCard>
      <CommunityUiInfo community={community} />
    </UiCard>
  )
}
