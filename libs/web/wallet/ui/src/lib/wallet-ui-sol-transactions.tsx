import { ActionIcon, Badge, Button, Group, Loader, Table, Text } from '@mantine/core'
import { UiError, UiInfo, UiStack, UiTime } from '@pubkey-ui/core'
import { ConfirmedSignatureInfo } from '@solana/web3.js'
import { IconRefresh } from '@tabler/icons-react'
import { ellipsify, Wallet } from '@tokengator-mint/sdk'
import { useSolanaGetTransactions } from '@tokengator-mint/web-solana-data-access'
import { SolanaUiExplorerLink } from '@tokengator-mint/web-solana-ui'
import { useMemo, useState } from 'react'

export function WalletUiSolTransactions({ wallet }: { wallet: Wallet }) {
  const query = useSolanaGetTransactions({ account: wallet.publicKey })
  const [showAll, setShowAll] = useState(false)

  const items: ConfirmedSignatureInfo[] = useMemo(() => {
    if (showAll) return query.data
    return query.data?.slice(0, 5)
  }, [query.data, showAll])

  return (
    <UiStack>
      <Group justify="space-between">
        <Text size="xl">Transactions</Text>
        {query.isLoading ? (
          <Loader size="xs" type="dots" />
        ) : (
          <ActionIcon variant="outline" onClick={() => query.refetch()}>
            <IconRefresh size={16} />
          </ActionIcon>
        )}
      </Group>
      {query.isError && <UiError title="An error occurred" message={`Error: ${query.error?.message.toString()}`} />}
      {query.isSuccess && query.data.length === 0 ? (
        <UiInfo
          message={'Transactions will appear here when you send or receive tokens.'}
          title={'No transactions found.'}
        />
      ) : (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Signature</Table.Th>
              <Table.Th align="right">Slot</Table.Th>
              <Table.Th>Block Time</Table.Th>
              <Table.Th align="right">Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {items?.map((item) => (
              <Table.Tr key={item.signature}>
                <Table.Th>
                  <SolanaUiExplorerLink
                    ff="monospace"
                    path={`tx/${item.signature}`}
                    label={ellipsify(item.signature, 8)}
                  />
                </Table.Th>
                <Table.Td>
                  <SolanaUiExplorerLink ff="monospace" path={`block/${item.slot}`} label={item.slot.toString()} />
                </Table.Td>
                <Table.Td>
                  <UiTime date={new Date((item.blockTime ?? 0) * 1000)} />
                </Table.Td>
                <Table.Td align="right">
                  {item.err ? (
                    <Badge color="red" title={JSON.stringify(item.err)}>
                      Failed
                    </Badge>
                  ) : (
                    <Badge color="green">Success</Badge>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
            {(query.data?.length ?? 0) > 5 && (
              <Table.Tr>
                <Table.Td colSpan={4} align="center">
                  <Button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'Show All'}</Button>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      )}
    </UiStack>
  )
}
