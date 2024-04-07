import { Button, Group } from '@mantine/core'
import { UiCard, UiInfo, UiLoader, UiStack, UiTabRoute, UiTabRoutes, UiWarning } from '@pubkey-ui/core'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { Community, User } from '@tokengator/sdk'
import { UserClaimFeature } from '@tokengator/web-claim-feature'
import {
  useUserCreateMintFromMinter,
  useUserGetMinter,
  useUserGetMinterAssets,
} from '@tokengator/web-community-data-access'
import { MinterUiAssets, MinterUiCard } from '@tokengator/web-community-ui'
import { UserUiItem, UserUiSearch } from '@tokengator/web-user-ui'
import { useMemo, useState } from 'react'
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
          <MintModal
            loading={mutation.isPending}
            mint={async ({ username }) => {
              mutation.mutateAsync({ username }).then(() => queryAssets.refetch())
            }}
          />
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

function MintModal({ loading, mint }: { loading: boolean; mint: (data: { username: string }) => Promise<void> }) {
  const [user, setUser] = useState<User | null>(null)
  return (
    <UiCard>
      <UserUiSearch
        label={'Mint to'}
        description={'Search for a user to mint to'}
        select={(user) => setUser(user ?? null)}
      />
      {user ? <UserUiItem user={user} to={user.profileUrl} /> : null}
      <Group justify="flex-end">
        <Button
          disabled={!user?.username}
          loading={loading}
          onClick={() => {
            if (!user?.username) return
            return mint({ username: user.username }).then(() => setUser(null))
          }}
        >
          Mint
        </Button>
      </Group>
    </UiCard>
  )
}
