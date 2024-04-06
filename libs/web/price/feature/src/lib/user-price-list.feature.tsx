import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { useUserFindManyPrice } from '@tokengator/web-price-data-access'
import { PriceUiGrid } from '@tokengator/web-price-ui'

export default function UserPriceListFeature({ presetId }: { presetId: string }) {
  const { items, query } = useUserFindManyPrice({
    presetId,
  })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <PriceUiGrid prices={items} />
      ) : (
        <UiInfo message="No prices found" />
      )}
    </UiStack>
  )
}
