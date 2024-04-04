import { WalletUserUpdateInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneWallet({ walletId }: { walletId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-wallet', walletId],
    queryFn: () => sdk.userFindOneWallet({ walletId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateWallet: async (input: WalletUserUpdateInput) =>
      sdk
        .userUpdateWallet({ walletId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Wallet updated')
            await query.refetch()
            return true
          }
          toastError('Wallet not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
