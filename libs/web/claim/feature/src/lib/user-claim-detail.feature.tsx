import { Group } from '@mantine/core'
import { UiBack, UiCard, UiDebugModal, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { useUserFindOneClaim } from '@tokengator-mint/web-claim-data-access'
import { ClaimUiInfo, ClaimUiItem } from '@tokengator-mint/web-claim-ui'
import { useParams } from 'react-router-dom'
import { UserClaimDetailSettingsTab } from './user-claim-detail-settings.tab'

export default function UserClaimDetailFeature() {
  const { claimId } = useParams<{ claimId: string }>() as { claimId: string }
  const { item, query } = useUserFindOneClaim({ claimId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Claim not found." />
  }

  return (
    <UiStack>
      <UiCard>
        <UiGroup>
          <Group>
            <UiBack />
            <ClaimUiItem claim={item} />
          </Group>
          <UiDebugModal data={item} />
        </UiGroup>
        <ClaimUiInfo claim={item} />
      </UiCard>
      <UserClaimDetailSettingsTab claimId={claimId} />
    </UiStack>
  )
}
