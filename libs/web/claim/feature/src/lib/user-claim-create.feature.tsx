import { Group } from '@mantine/core'
import { toastError, UiBack, UiCard, UiCardTitle, UiStack } from '@pubkey-ui/core'
import { ClaimUserCreateInput } from '@tokengator-mint/sdk'
import { useUserFindManyClaim } from '@tokengator-mint/web-claim-data-access'
import { UserClaimUiCreateForm } from '@tokengator-mint/web-claim-ui'
import { useNavigate } from 'react-router-dom'

export default function UserClaimCreateFeature({ communityId, account }: { communityId: string; account: string }) {
  const navigate = useNavigate()
  const { createClaim } = useUserFindManyClaim({ communityId, account })

  async function submit(input: ClaimUserCreateInput) {
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
    <UiStack>
      <Group>
        <UiBack />
        <UiCardTitle>Create Claim</UiCardTitle>
      </Group>
      <UiCard>
        <UserClaimUiCreateForm submit={submit} />
      </UiCard>
    </UiStack>
  )
}
