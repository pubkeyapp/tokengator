import { Anchor, Button, Group, Text } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { UiSearchField } from '@tokengator-mint/web-core-ui'
import { useUserFindManyWallet } from '@tokengator-mint/web-wallet-data-access'
import { WalletUiGrid } from '@tokengator-mint/web-wallet-ui'
import { Link } from 'react-router-dom'

export default function UserWalletListFeature({ communityId }: { communityId: string }) {
  const { items, pagination, query, setSearch } = useUserFindManyWallet({
    limit: 12,
    communityId,
  })

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
            <Text>
              Wallets are used to pay fees for storage and transactions and receive payments. Wallets are associated
              with a community.
            </Text>
            <Text>
              Go to{' '}
              <Anchor href="https://faucet.solana.com" target="_blank">
                faucet.solana.com
              </Anchor>{' '}
              to get some SOL for your wallet.
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
