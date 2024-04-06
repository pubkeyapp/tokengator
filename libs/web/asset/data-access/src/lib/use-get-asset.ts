import { useQuery } from '@tanstack/react-query'
import { Asset } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'

export function useGetAsset({ account }: { account: string }) {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['getAsset', account],
    queryFn: async () => sdk.getAsset({ account }).then((res) => res.data?.item as Asset | undefined),
  })
}
