import { useQuery } from '@tanstack/react-query'
import { AnonFindManyCommunityInput, Community } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'
import { useState } from 'react'

export function useAnonFindManyCommunity(props?: Partial<AnonFindManyCommunityInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AnonFindManyCommunityInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['anon', 'find-many-community', input],
    queryFn: () => sdk.anonFindManyCommunity({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items: Community[] = query.data?.paging.data ?? []

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
  }
}
