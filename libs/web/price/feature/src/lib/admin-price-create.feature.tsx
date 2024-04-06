import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { PriceAdminCreateInput } from '@tokengator/sdk'
import { useAdminFindManyPrice } from '@tokengator/web-price-data-access'
import { AdminPriceUiCreateForm } from '@tokengator/web-price-ui'
import { useNavigate } from 'react-router-dom'

export default function AdminPriceCreateFeature({ presetId }: { presetId: string }) {
  const navigate = useNavigate()
  const { createPrice } = useAdminFindManyPrice({ presetId })

  async function submit(input: PriceAdminCreateInput) {
    return createPrice(input)
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
    <UiPage leftAction={<UiBack />} title="Create Price">
      <UiCard>
        <AdminPriceUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
