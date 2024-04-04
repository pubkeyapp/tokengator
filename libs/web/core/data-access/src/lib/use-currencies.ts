import { useQuery } from '@tanstack/react-query'
import { useSdk } from './sdk-provider'

export function useCurrencies() {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => sdk.currencies().then((res) => res.data?.items ?? []),
    retry: 0,
  })
}
