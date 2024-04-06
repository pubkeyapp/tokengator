import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { ClaimUserCreateInput, ClaimUserFindManyInput } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'
import { useState } from 'react'

export function useUserFindManyClaim(
  props: Partial<ClaimUserFindManyInput> & { communityId: string; account: string },
) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ClaimUserFindManyInput = { page, limit, search, communityId: props.communityId, account: props.account }
  const query = useQuery({
    queryKey: ['user', 'find-many-claim', input],
    queryFn: () => sdk.userFindManyClaim({ input }).then((res) => res.data),
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
    createClaim: (input: ClaimUserCreateInput) =>
      sdk
        .userCreateClaim({ input: { ...input, account: props.account, communityId: props.communityId } })
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
      sdk.userDeleteClaim({ claimId }).then(() => {
        toastSuccess('Claim deleted')
        return query.refetch()
      }),
  }
}
