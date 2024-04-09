import { Button, Group, Text } from '@mantine/core'
import { UiAnchor, UiCard, UiInfo, UiLoader, UiStack, UiTabRoute, UiTabRoutes, UiWarning } from '@pubkey-ui/core'
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
import { MinterAuthoritiesFeature } from './minter-authorities-feature'

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
          <UiInfo
            title="Collection Assets"
            variant="outline"
            message={<Text>These are the assets that the community has minted in this collection.</Text>}
          />
          <MintModal
            loading={mutation.isPending}
            mint={async ({ username }) => {
              mutation.mutateAsync({ username }).then(() => queryAssets.refetch())
            }}
          />
          {queryAssets.isLoading ? (
            <UiLoader />
          ) : items?.length ? (
            <MinterUiAssets items={items} />
          ) : (
            <UiInfo message="No assets found" />
          )}
        </UiStack>
      ),
    },
    {
      path: 'claims',
      label: 'Claims',
      element: (
        <UiStack>
          <UiInfo
            title="Collection Claims"
            variant="outline"
            message={<Text>Claims give the user the ability to mint assets in this collection.</Text>}
          />
          <UserClaimFeature communityId={community.id} account={account} />
        </UiStack>
      ),
    },
    {
      path: 'authorities',
      label: 'Authorities',
      element: (
        <UiStack>
          <UiInfo
            title="Collection Authorities"
            variant="outline"
            message={
              <UiStack>
                <Text>The Authorities are Solana accounts that can manage this Collection Minter.</Text>
                <Text>
                  You can add any of your <UiAnchor to={`/c/${community.slug}/wallets`}>Wallets</UiAnchor> as
                  authorities.
                </Text>
              </UiStack>
            }
          />
          {query.data ? (
            <MinterAuthoritiesFeature
              community={community}
              minter={query.data}
              refresh={async () => {
                await query.refetch()
              }}
            />
          ) : null}
        </UiStack>
      ),
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
