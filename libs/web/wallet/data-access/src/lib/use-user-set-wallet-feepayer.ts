import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { useSdk } from '@tokengator/web-core-data-access'

export function useUserSetWalletFeepayer() {
  const sdk = useSdk()
  return useMutation({
    mutationFn: ({ publicKey }: { publicKey: string }) =>
      sdk
        .userSetWalletFeepayer({ publicKey })
        .then((res) => {
          toastSuccess('Airdrop requested')
        })
        .catch((err) => {
          toastError(err.message)
        }),
  })
}
