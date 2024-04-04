import { PresetAdminCreateInput, PresetAdminFindManyInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyPreset(props: Partial<PresetAdminFindManyInput> = {}) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: PresetAdminFindManyInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-preset', input],
    queryFn: () => sdk.adminFindManyPreset({ input }).then((res) => res.data),
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
    createPreset: (input: PresetAdminCreateInput) =>
      sdk
        .adminCreatePreset({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Preset created`)
          } else {
            toastError(`Preset not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deletePreset: (presetId: string) =>
      sdk.adminDeletePreset({ presetId }).then(() => {
        toastSuccess('Preset deleted')
        return query.refetch()
      }),
  }
}
