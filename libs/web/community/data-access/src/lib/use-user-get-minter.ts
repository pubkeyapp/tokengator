import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@tokengator-mint/web-core-data-access'

export function useUserGetMinter({ account }: { account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['userGetMinter', { account }],
    queryFn: async () => {
      return sdk.userGetMinter({ account }).then((res) => res.data?.item ?? undefined)
    },
  })
}
