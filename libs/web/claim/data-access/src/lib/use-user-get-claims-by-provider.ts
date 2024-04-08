import { useQuery } from '@tanstack/react-query'
import { Claim, IdentityProvider } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'

export function useUserGetClaimsByProvider({
  provider,
  providerId,
}: {
  provider: IdentityProvider
  providerId: string
}) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'getClaimsByProvider', { provider, providerId }],
    queryFn: () => sdk.userGetClaimsByProvider({ provider, providerId }).then((res) => res.data),
    retry: 0,
  })

  const items: Claim[] = query.data?.items ?? []

  return {
    items,
    query,
  }
}
