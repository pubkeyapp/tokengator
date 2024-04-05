import { useAdminFindOneClaim } from '@tokengator-mint/web-claim-data-access'
import { AdminClaimUiUpdateForm } from '@tokengator-mint/web-claim-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminClaimDetailSettingsTab({ claimId }: { claimId: string }) {
  const { item, query, updateClaim } = useAdminFindOneClaim({ claimId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Claim not found." />
  }

  return (
    <UiCard>
      <AdminClaimUiUpdateForm claim={item} submit={updateClaim} />
    </UiCard>
  )
}
