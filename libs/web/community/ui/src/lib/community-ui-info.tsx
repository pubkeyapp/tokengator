import { Community } from '@tokengator-mint/sdk'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function CommunityUiInfo({ community }: { community?: Community }) {
  if (!community) return null

  const items: UiInfoItems = [
    ['name', community.name],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(community.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(community.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
