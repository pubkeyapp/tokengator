import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@tokengator-mint/web-core-data-access'

export function useSolanaGetTokenAccounts({ account }: { account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['solanaGetTokenAccounts', account],
    queryFn: () => sdk.solanaGetTokenAccounts({ account }).then((res) => res.data.items ?? []),
  })
}
