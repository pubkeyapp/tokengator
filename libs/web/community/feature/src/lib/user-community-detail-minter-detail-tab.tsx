import { Button, Group } from '@mantine/core'
import { UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { Community } from '@tokengator-mint/sdk'
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

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : query.data ? (
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
      ) : (
        <UiWarning message={`Minter not found: ${account}`} />
      )}
    </UiStack>
  )
}
