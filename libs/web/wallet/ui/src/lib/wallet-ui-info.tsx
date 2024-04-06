import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'
import { Wallet } from '@tokengator/sdk'

export function WalletUiInfo({ wallet }: { wallet?: Wallet }) {
  if (!wallet) return null

  const items: UiInfoItems = [
    ['name', wallet.name],
    ['publicKey', wallet.publicKey],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(wallet.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(wallet.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
