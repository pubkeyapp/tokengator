import { Group } from '@mantine/core'
import { UiBack, UiCard, UiDebugModal, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { useUserGetClaim } from '@tokengator-mint/web-claim-data-access'
import { ClaimUiInfo, ClaimUiItem } from '@tokengator-mint/web-claim-ui'
import { useParams } from 'react-router-dom'

export default function UserClaimDetailFeature() {
  const { claimId } = useParams<{ claimId: string }>() as { claimId: string }
  const { item, query } = useUserGetClaim({ claimId })

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
    </UiStack>
  )
}
