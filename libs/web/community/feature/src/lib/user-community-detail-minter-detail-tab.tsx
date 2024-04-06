import { Button, Group } from '@mantine/core'
import { UiInfo, UiLoader, UiStack, UiTabRoute, UiTabRoutes, UiWarning } from '@pubkey-ui/core'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { Community } from '@tokengator/sdk'
import { UserClaimFeature } from '@tokengator/web-claim-feature'
import {
  useUserCreateMintFromMinter,
  useUserGetMinter,
  useUserGetMinterAssets,
} from '@tokengator/web-community-data-access'
import { MinterUiAssets, MinterUiCard } from '@tokengator/web-community-ui'
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
      element: (
        <UiStack>
          <Group justify="flex-end">
            <Button
              loading={mutation.isPending}
              onClick={() => mutation.mutateAsync().then(() => queryAssets.refetch())}
            >
              Mint
            </Button>
          </Group>
          {items?.length ? <MinterUiAssets items={items} /> : <UiInfo message="No assets found" />}
        </UiStack>
      ),
    },
    {
      path: 'claims',
      label: 'Claims',
      element: <UserClaimFeature communityId={community.id} account={account} />,
    },
  ]

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : query.data ? (
        <UiStack>
          <MinterUiCard item={query.data} />
          <UiTabRoutes tabs={tabs} />
        </UiStack>
      ) : (
        <UiWarning message={`Minter not found: ${account}`} />
      )}
    </UiStack>
  )
}
