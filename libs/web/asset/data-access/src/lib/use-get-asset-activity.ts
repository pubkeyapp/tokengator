import { useQuery } from '@tanstack/react-query'
import { AssetActivity, AssetActivityType } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'

export function useGetAssetActivity({ account, type }: { account: string; type: AssetActivityType }) {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['getAssetActivity', { account, type }],
    queryFn: async () =>
      sdk.getAssetActivity({ account, type }).then((res) => res.data?.item as AssetActivity | undefined),
  })
}
