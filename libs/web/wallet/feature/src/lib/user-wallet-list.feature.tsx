import { Anchor, Button, Group, Text } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { UiSearchField } from '@tokengator/web-core-ui'
import { useSolanaRequestAirdrop } from '@tokengator/web-solana-data-access'
import { useUserFindManyWallet, useUserSetWalletFeepayer } from '@tokengator/web-wallet-data-access'
import { WalletUiGrid } from '@tokengator/web-wallet-ui'
import { Link } from 'react-router-dom'

export default function UserWalletListFeature({ communityId }: { communityId: string }) {
  const { items, pagination, query, setSearch } = useUserFindManyWallet({
    limit: 12,
    communityId,
  })

  const requestAirdropMutation = useSolanaRequestAirdrop()
  const setFeepayerMutation = useUserSetWalletFeepayer()

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search wallet" setSearch={setSearch} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>
      <UiInfo
        title="About Wallets"
        message={
          <UiStack>
            <Text>Wallets are used to pay fees for storage and transactions and receive payments.</Text>
            <Text>
              Request an airdrop or go to{' '}
              <Anchor href="https://faucet.solana.com" target="_blank">
                faucet.solana.com
              </Anchor>{' '}
              (SOL) and{' '}
              <Anchor href="https://faucet.circle.com" target="_blank">
                faucet.circle.com
              </Anchor>{' '}
              (USDC/EURC) to fund your wallet.
            </Text>
          </UiStack>
        }
      />

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <WalletUiGrid
          wallets={items}
          page={pagination.page}
          setFeepayer={(publicKey) => setFeepayerMutation.mutateAsync({ publicKey })}
          requestAirdrop={(account) => requestAirdropMutation.mutateAsync({ account })}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No wallets found" />
      )}
    </UiStack>
  )
}
