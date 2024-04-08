import { useMutation, useQuery } from '@tanstack/react-query'
import { PresetActivity, TokenGatorActivity } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'

export function useGetAssetActivity({ account, type }: { account: string; type: PresetActivity }) {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['getAssetActivity', { account, type }],
    queryFn: async () =>
      sdk.getAssetActivity({ account, type }).then((res) => res.data?.item as TokenGatorActivity | undefined),
  })
}

export function useCreateAssetActivity({ account, type }: { account: string; type: PresetActivity }) {
  const sdk = useSdk()

  return useMutation({
    mutationFn: async () =>
      sdk.createAssetActivity({ account, type }).then((res) => res.data?.item as TokenGatorActivity | undefined),
  })
}

export function useCreateAssetActivityEvent({ account, type }: { account: string; type: PresetActivity }) {
  const sdk = useSdk()

  return useMutation({
    mutationFn: async (message: string) =>
      sdk
        .createAssetActivityEvent({ account, type, message })
        .then((res) => res.data?.item as TokenGatorActivity | undefined),
  })
}
