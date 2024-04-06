import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { ClaimAdminCreateInput } from '@tokengator/sdk'
import { useAdminFindManyClaim } from '@tokengator/web-claim-data-access'
import { AdminClaimUiCreateForm } from '@tokengator/web-claim-ui'
import { useNavigate } from 'react-router-dom'

export default function AdminClaimCreateFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { createClaim } = useAdminFindManyClaim({ communityId })

  async function submit(input: ClaimAdminCreateInput) {
    return createClaim(input)
      .then((res) => {
        if (res) {
          navigate(`../${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Claim">
      <UiCard>
        <AdminClaimUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
