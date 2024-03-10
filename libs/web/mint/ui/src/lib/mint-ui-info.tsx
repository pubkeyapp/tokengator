import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'
import { Mint } from '@tokengator-mint/sdk'

export function MintUiInfo({ mint }: { mint?: Mint }) {
  if (!mint) return null

  const items: UiInfoItems = [
    ['Name', mint.name],
    ['Public Key', mint.publicKey],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(mint.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(mint.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
