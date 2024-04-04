import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { Preset } from '@tokengator-mint/sdk'
import { PresetUiAvatar } from './preset-ui-avatar'

export function PresetUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  preset,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  preset?: Preset
  to?: string | null
}) {
  if (!preset) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <PresetUiAvatar preset={preset} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {preset?.name}
          </Text>
          <Text size="sm" c="dimmed">
            {preset?.description}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
