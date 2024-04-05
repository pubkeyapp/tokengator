import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'
import { Claim } from '@tokengator-mint/sdk'

export function ClaimUiInfo({ claim }: { claim?: Claim }) {
  if (!claim) return null

  const items: UiInfoItems = [
    ['status', claim.status],
    ['amount', claim.amount],
    ['provider', claim.provider],
    ['providerId', claim.providerId],
    ['account', claim.account],
    ['signature', claim.signature],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(claim.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(claim.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
