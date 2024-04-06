import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@tokengator/web-core-data-access'

export function useSolanaGetTransactions({ account }: { account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['solanaGetTransactions', account],
    queryFn: () => sdk.solanaGetTransactions({ account }).then((res) => res.data.items ?? []),
  })
}
