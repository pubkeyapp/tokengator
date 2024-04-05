import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { ClaimAdminCreateInput, ClaimAdminFindManyInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { useState } from 'react'

export function useAdminFindManyClaim(props: Partial<ClaimAdminFindManyInput> & { communityId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ClaimAdminFindManyInput = { page, limit, search, communityId: props.communityId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-claim', input],
    queryFn: () => sdk.adminFindManyClaim({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    createClaim: (input: ClaimAdminCreateInput) =>
      sdk
        .adminCreateClaim({ input: { ...input, communityId: props.communityId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Claim created`)
          } else {
            toastError(`Claim not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteClaim: (claimId: string) =>
      sdk.adminDeleteClaim({ claimId }).then(() => {
        toastSuccess('Claim deleted')
        return query.refetch()
      }),
  }
}
