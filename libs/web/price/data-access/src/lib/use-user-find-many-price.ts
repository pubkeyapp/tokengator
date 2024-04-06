import { useQuery } from '@tanstack/react-query'
import { PriceUserFindManyInput } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'

export function useUserFindManyPrice(props: Partial<PriceUserFindManyInput> & { presetId: string }) {
  const sdk = useSdk()

  const input: PriceUserFindManyInput = { presetId: props.presetId }
  const query = useQuery({
    queryKey: ['user', 'find-many-price', input],
    queryFn: () => sdk.userFindManyPrice({ input }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
