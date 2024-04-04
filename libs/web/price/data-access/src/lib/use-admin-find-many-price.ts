import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { PriceAdminCreateInput, PriceAdminFindManyInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'

export function useAdminFindManyPrice(props: Partial<PriceAdminFindManyInput> & { presetId: string }) {
  const sdk = useSdk()

  const input: PriceAdminFindManyInput = { presetId: props.presetId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-price', input],
    queryFn: () => sdk.adminFindManyPrice({ input }).then((res) => res.data),
  })

  const items = query.data?.items ?? []

  return {
    items,
    query,

    createPrice: (input: PriceAdminCreateInput) =>
      sdk
        .adminCreatePrice({ input: { ...input, presetId: props.presetId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Price created`)
          } else {
            toastError(`Price not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deletePrice: (priceId: string) =>
      sdk.adminDeletePrice({ priceId }).then(() => {
        toastSuccess('Price deleted')
        return query.refetch()
      }),
  }
}
