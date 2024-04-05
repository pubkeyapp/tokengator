import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { useSdk } from '@tokengator-mint/web-core-data-access'

export function useSolanaRequestAirdrop() {
  const sdk = useSdk()
  return useMutation({
    mutationFn: ({ account }: { account: string }) =>
      sdk
        .solanaRequestAirdrop({ account })
        .then((res) => {
          toastSuccess('Airdrop requested')
        })
        .catch((err) => {
          toastError(err.message)
        }),
  })
}
