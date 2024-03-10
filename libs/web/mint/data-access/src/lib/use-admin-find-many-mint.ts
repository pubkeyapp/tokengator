import { AdminCreateMintInput, AdminFindManyMintInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyMint(props?: Partial<AdminFindManyMintInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyMintInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-mint', input],
    queryFn: () => sdk.adminFindManyMint({ input }).then((res) => res.data),
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
    createMint: (input: AdminCreateMintInput) =>
      sdk
        .adminCreateMint({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Mint created`)
          } else {
            toastError(`Mint not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteMint: (mintId: string) =>
      sdk.adminDeleteMint({ mintId }).then(() => {
        toastSuccess('Mint deleted')
        return query.refetch()
      }),
  }
}