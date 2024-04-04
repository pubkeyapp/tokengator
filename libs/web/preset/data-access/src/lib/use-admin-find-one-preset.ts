import { PresetAdminUpdateInput } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOnePreset({ presetId }: { presetId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-preset', presetId],
    queryFn: () => sdk.adminFindOnePreset({ presetId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updatePreset: async (input: PresetAdminUpdateInput) =>
      sdk
        .adminUpdatePreset({ presetId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Preset updated')
            await query.refetch()
            return true
          }
          toastError('Preset not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
