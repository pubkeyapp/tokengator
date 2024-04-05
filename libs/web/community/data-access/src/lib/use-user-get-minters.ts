import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@tokengator-mint/web-core-data-access'

export function useUserGetMinters() {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['userGetMinters'],
    queryFn: async () => {
      return sdk.userGetMinters().then((res) => res.data?.items ?? [])
    },
  })
}

export function useUserGetMintersByCommunity({ slug }: { slug: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['userGetMinters'],
    queryFn: async () => {
      return sdk.userGetMintersByCommunity({ communitySlug: slug }).then((res) => res.data?.items ?? [])
    },
  })
}
