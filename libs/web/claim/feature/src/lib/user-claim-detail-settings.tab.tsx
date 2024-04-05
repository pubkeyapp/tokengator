import { useUserFindOneClaim } from '@tokengator-mint/web-claim-data-access'
import { UserClaimUiUpdateForm } from '@tokengator-mint/web-claim-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserClaimDetailSettingsTab({ claimId }: { claimId: string }) {
  const { item, query, updateClaim } = useUserFindOneClaim({ claimId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Claim not found." />
  }

  return (
    <UiCard>
      <UserClaimUiUpdateForm claim={item} submit={updateClaim} />
    </UiCard>
  )
}
