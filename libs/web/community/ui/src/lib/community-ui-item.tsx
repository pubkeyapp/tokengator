import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { Community } from '@tokengator-mint/sdk'
import { CommunityUiAvatar } from './community-ui-avatar'

export function CommunityUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  community,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  community?: Community
  to?: string | null
}) {
  if (!community) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <CommunityUiAvatar community={community} {...avatarProps} />
        <Stack gap={0}>
          <Text size="lg" fw={500}>
            {community?.name}
          </Text>
          <Text c="dimmed" size="xs">
            {community?.description}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
