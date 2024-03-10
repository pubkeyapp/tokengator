import { AdminCreateMintInput } from '@tokengator-mint/sdk'
import { useAdminFindManyMint } from '@tokengator-mint/web-mint-data-access'
import { AdminMintUiCreateForm } from '@tokengator-mint/web-mint-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminMintCreateFeature() {
  const navigate = useNavigate()
  const { createMint } = useAdminFindManyMint()

  async function submit(input: AdminCreateMintInput) {
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
        <AdminMintUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
