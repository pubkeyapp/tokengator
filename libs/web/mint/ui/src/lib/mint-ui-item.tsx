import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ellipsify, Mint } from '@tokengator-mint/sdk'
import { MintUiAvatar } from './mint-ui-avatar'

export function MintUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  mint,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  mint?: Mint
  to?: string | null
}) {
  if (!mint) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <MintUiAvatar mint={mint} {...avatarProps} />
        <Stack gap={0}>
          <Text size="lg">{mint?.name}</Text>
          <Text ff="mono" c="dimmed" size="xs">
            {ellipsify(mint?.publicKey, 8)}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
