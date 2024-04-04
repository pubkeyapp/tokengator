import { useQuery } from '@tanstack/react-query'
import { PresetUserFindManyInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { useState } from 'react'

export function useUserFindManyPreset(props: Partial<PresetUserFindManyInput> = {}) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: PresetUserFindManyInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['user', 'find-many-preset', input],
    queryFn: () => sdk.userFindManyPreset({ input }).then((res) => res.data),
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
  }
}
