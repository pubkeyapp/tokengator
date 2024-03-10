import { UserCreateMintInput } from '@tokengator-mint/sdk'
import { useUserFindManyMint } from '@tokengator-mint/web-mint-data-access'
import { UserMintUiCreateForm } from '@tokengator-mint/web-mint-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserMintCreateFeature() {
  const navigate = useNavigate()
  const { createMint } = useUserFindManyMint()

  async function submit(input: UserCreateMintInput) {
    return createMint(input)
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
    <UiPage leftAction={<UiBack />} title="Create Mint">
      <UiCard>
        <UserMintUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
