import { useQuery } from '@tanstack/react-query'
import { Community } from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'

export function useAnonFindOneCommunity({ slug }: { slug: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['anon', 'find-one-community', slug],
    queryFn: () => sdk.anonFindOneCommunity({ slug }).then((res) => res.data),
    retry: 0,
  })
  const item: Community | undefined = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
