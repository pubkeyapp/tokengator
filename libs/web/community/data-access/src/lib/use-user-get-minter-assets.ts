import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@tokengator/web-core-data-access'

export function useUserGetMinterAssets({ account }: { account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['userGetMinterAssets', { account }],
    queryFn: async () => {
      return sdk.userGetMinterAssets({ account }).then((res) => res.data?.items ?? [])
    },
  })
}
