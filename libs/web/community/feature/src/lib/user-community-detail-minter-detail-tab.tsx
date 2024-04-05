import { Button, Group } from '@mantine/core'
import { UiInfo, UiLoader, UiStack, UiTabRoute, UiTabRoutes, UiWarning } from '@pubkey-ui/core'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { Community } from '@tokengator-mint/sdk'
import { UserClaimFeature } from '@tokengator-mint/web-claim-feature'
import {
  useUserCreateMintFromMinter,
  useUserGetMinter,
  useUserGetMinterAssets,
} from '@tokengator-mint/web-community-data-access'
import { MinterUiAssets, MinterUiCard } from '@tokengator-mint/web-community-ui'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export function UserCommunityDetailMinterDetailTab({ community }: { community: Community }) {
  const { account } = useParams<{ account: string }>() as { account: string }
  const query = useUserGetMinter({ account })
  const mutation = useUserCreateMintFromMinter({ account, communitySlug: community.slug })
  const queryAssets = useUserGetMinterAssets({ account })
  const items: AccountInfo<ParsedAccountData>[] = useMemo(() => queryAssets.data ?? [], [queryAssets.data])

  const tabs: UiTabRoute[] = [
    {
      path: 'assets',
      label: 'Assets',
      element: items?.length ? <MinterUiAssets items={items} /> : <UiInfo message="No assets found" />,
    },
    {
      path: 'claims',
      label: 'Claims',
      element: <UserClaimFeature communityId={community.id} minter={account} />,
    },
  ]

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : query.data ? (
        <UiStack>
          <MinterUiCard item={query.data}>
            <Group justify="flex-end">
              <Button
                loading={mutation.isPending}
                onClick={() => mutation.mutateAsync().then(() => queryAssets.refetch())}
              >
                Mint
              </Button>
            </Group>

            <MinterUiAssets items={items} />
          </MinterUiCard>
          <UiTabRoutes tabs={tabs} />
        </UiStack>
      ) : (
        <UiWarning message={`Minter not found: ${account}`} />
      )}
    </UiStack>
  )
}
