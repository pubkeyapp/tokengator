import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@tokengator/web-core-data-access'

export function useSolanaGetBalance({ account }: { account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['solanaGetBalance', account],
    queryFn: () => sdk.solanaGetBalance({ account }).then((res) => res.data.balance ?? '0'),
  })
}
