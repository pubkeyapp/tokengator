import { Text, TextProps } from '@mantine/core'
import { PresetActivity, TokenGatorActivity, TokenGatorActivityEntry } from '@tokengator/sdk'

export function AssetActivityUiPoints({
  activity,
  entry,
  ...props
}: TextProps & { activity: TokenGatorActivity; entry?: TokenGatorActivityEntry }) {
  const points = entry?.points ?? activity.pointsTotal ?? 0
  const label = activity.pointsLabel ?? 'Points'
  const prefix = activity.type === PresetActivity.Payouts ? '$' : ''

  return (
    <Text {...props} span>
      {prefix}
      {points} {label}
    </Text>
  )
}
