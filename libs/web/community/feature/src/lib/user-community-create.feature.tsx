import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { UserCreateCommunityInput } from '@tokengator-mint/sdk'
import { useUserFindManyCommunity } from '@tokengator-mint/web-community-data-access'
import { UserCommunityUiCreateForm } from '@tokengator-mint/web-community-ui'
import { useNavigate } from 'react-router-dom'

export function UserCommunityCreateFeature() {
  const navigate = useNavigate()
  const { createCommunity } = useUserFindManyCommunity()

  async function submit(input: UserCreateCommunityInput) {
    return createCommunity(input)
      .then((res) => {
        if (res) {
          navigate(`../${res?.viewUrl}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Community">
      <UiCard>
        <UserCommunityUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
