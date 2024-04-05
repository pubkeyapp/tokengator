import { ClaimUserUpdateInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneClaim({ claimId }: { claimId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-claim', claimId],
    queryFn: () => sdk.userFindOneClaim({ claimId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateClaim: async (input: ClaimUserUpdateInput) =>
      sdk
        .userUpdateClaim({ claimId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Claim updated')
            await query.refetch()
            return true
          }
          toastError('Claim not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
