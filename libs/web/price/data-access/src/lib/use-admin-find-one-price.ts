import { PriceAdminUpdateInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOnePrice({ priceId }: { priceId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-price', priceId],
    queryFn: () => sdk.adminFindOnePrice({ priceId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updatePrice: async (input: PriceAdminUpdateInput) =>
      sdk
        .adminUpdatePrice({ priceId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Price updated')
            await query.refetch()
            return true
          }
          toastError('Price not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
