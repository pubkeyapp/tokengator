import { AspectRatio, Image, Text, TextProps, Timeline, useMantineTheme } from '@mantine/core'
import { UiCardTitle, UiDebugModal, UiStack, UiTime } from '@pubkey-ui/core'
import { IconCheck } from '@tabler/icons-react'
import { Asset, AssetActivity, AssetActivityEntry, AssetActivityType } from '@tokengator/sdk'

export function AssetUiItem({ asset }: { asset: Asset }) {
  const { colors } = useMantineTheme()
  return (
    <UiStack>
      <AspectRatio ratio={1}>
        <Image src={asset.image} bg={colors.gray[5]} radius="md" />
      </AspectRatio>
      <UiStack>
        <UiCardTitle>{asset.name}</UiCardTitle>
        <UiDebugModal data={asset} />
      </UiStack>
    </UiStack>
  )
}

export function AssetActivityUiPoints({
  activity,
  entry,
  ...props
}: TextProps & { activity: AssetActivity; entry?: AssetActivityEntry }) {
  const points = entry?.points ?? activity.pointsTotal ?? 0
  const label = activity.pointsLabel ?? 'Points'
  const prefix = activity.type === AssetActivityType.Payouts ? '$' : ''

  return (
    <Text {...props} span>
      {prefix}
      {points} {label}
    </Text>
  )
}

export function AssetActivityUiEntryList({
  activity,
  entries,
}: {
  activity: AssetActivity
  entries: AssetActivityEntry[]
}) {
  return (
    <Timeline active={entries.length} bulletSize={24} lineWidth={2}>
      {entries.reverse().map((entry) => (
        <Timeline.Item key={entry.timestamp.toString()} bullet={<IconCheck size={12} />} title={entry.message}>
          {(entry?.points ?? 0) > 0 ? (
            <Text c="dimmed" size="sm" span>
              Earned <AssetActivityUiPoints activity={activity} entry={entry} />
            </Text>
          ) : null}
          <UiTime date={new Date(entry.timestamp)} size="xs" mt={4} />
        </Timeline.Item>
      ))}
    </Timeline>
  )
}
