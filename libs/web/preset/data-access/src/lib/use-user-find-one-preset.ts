import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { PresetUserMintFromPreset } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'
import { uiToastLink, useCluster } from '@tokengator/web-solana-data-access'

export function useUserFindOnePreset({ presetId }: { presetId: string }) {
  const sdk = useSdk()
  const { getExplorerUrl } = useCluster()
  const query = useQuery({
    queryKey: ['user', 'find-one-preset', presetId],
    queryFn: () => sdk.userFindOnePreset({ presetId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    createMinter: ({ communitySlug }: Omit<PresetUserMintFromPreset, 'presetId'>) =>
      sdk
        .userCreateMintFromPreset({ input: { communitySlug, presetId } })
        .then((res) => {
          if (res.data.minted) {
            toastSuccess('Minter created')
            uiToastLink({
              label: 'View Transaction',
              link: getExplorerUrl(`tx/${res.data.minted}`),
            })
          }
          return res.data.minted
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
