import { UserUpdateMintInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneMint({ mintId }: { mintId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-mint', mintId],
    queryFn: () => sdk.userFindOneMint({ mintId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateMint: async (input: UserUpdateMintInput) =>
      sdk
        .userUpdateMint({ mintId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Mint updated')
            await query.refetch()
            return true
          }
          toastError('Mint not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
