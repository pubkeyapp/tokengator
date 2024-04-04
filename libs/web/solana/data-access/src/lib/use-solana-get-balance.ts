import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@tokengator-mint/web-core-data-access'

export function useSolanaGetBalance({ account }: { account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['solanaGetBalance', account],
    queryFn: () => sdk.solanaGetBalance({ account }).then((res) => res.data.balance ?? '0'),
  })
}

export function useSolanaGetTokenAccounts({ account }: { account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['solanaGetTokenAccounts', account],
    queryFn: () => sdk.solanaGetTokenAccounts({ account }).then((res) => res.data.items ?? []),
  })
}

export function useSolanaGetTransactions({ account }: { account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['solanaGetTransactions', account],
    queryFn: () => sdk.solanaGetTransactions({ account }).then((res) => res.data.items ?? []),
  })
}
