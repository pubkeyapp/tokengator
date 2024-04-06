import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { Claim } from '@tokengator/sdk'
import { ClaimUiAvatar } from './claim-ui-avatar'

export function ClaimUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  claim,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  claim?: Claim
  to?: string | null
}) {
  if (!claim) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <ClaimUiAvatar claim={claim} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {claim?.name}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
