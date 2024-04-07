import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { PresetUserMintFromMinter } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'
import { uiToastLink, useCluster } from '@tokengator/web-solana-data-access'

export function useUserCreateMintFromMinter({ account, communitySlug }: { account: string; communitySlug: string }) {
  const sdk = useSdk()
  const { getExplorerUrl } = useCluster()
  return useMutation({
    mutationKey: ['userCreateMintFromMinter', { account }],
    mutationFn: async (input: Omit<PresetUserMintFromMinter, 'account' | 'communitySlug'>) =>
      sdk
        .userCreateMintFromMinter({ input: { ...input, account, communitySlug } })
        .then((res) => {
          if (res.data.minted) {
            toastSuccess('Mint created')
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
  })
}
