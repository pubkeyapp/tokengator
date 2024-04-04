import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { useAdminFindOnePrice } from '@tokengator-mint/web-price-data-access'
import { AdminPriceUiUpdateForm } from '@tokengator-mint/web-price-ui'

export function AdminPriceDetailSettingsTab({ priceId }: { priceId: string }) {
  const { item, query, updatePrice } = useAdminFindOnePrice({ priceId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Price not found." />
  }

  return (
    <UiCard>
      <AdminPriceUiUpdateForm price={item} submit={updatePrice} />
    </UiCard>
  )
}
