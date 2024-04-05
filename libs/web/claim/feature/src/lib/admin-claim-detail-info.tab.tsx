import { useAdminFindOneClaim } from '@tokengator-mint/web-claim-data-access'
import { ClaimUiInfo } from '@tokengator-mint/web-claim-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminClaimDetailInfoTab({ claimId }: { claimId: string }) {
  const { item, query } = useAdminFindOneClaim({ claimId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Claim not found." />
  }

  return (
    <UiCard>
      <ClaimUiInfo claim={item} />
    </UiCard>
  )
}
