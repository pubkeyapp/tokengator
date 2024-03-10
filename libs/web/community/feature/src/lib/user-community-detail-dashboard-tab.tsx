import { UiCard } from '@pubkey-ui/core'
import { Community } from '@tokengator-mint/sdk'
import { CommunityUiInfo } from '@tokengator-mint/web-community-ui'

export function UserCommunityDetailDashboardTab({ community }: { community: Community }) {
  return (
    <UiCard>
      <CommunityUiInfo community={community} />
    </UiCard>
  )
}
