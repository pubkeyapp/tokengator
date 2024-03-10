import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@tokengator-mint/web-core-data-access'

export function useUserGetMintAccount({ mintId }: { mintId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'get-mint-account', mintId],
    queryFn: () => sdk.userGetMintAccount({ mintId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    mintToIdentity: (identityId: string) =>
      sdk
        .userMintToIdentity({ mintId, identityId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.minted) {
            toastSuccess('Minted')
          } else {
            toastError('Not minted')
          }
          await query.refetch()
          return !!res.minted
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
