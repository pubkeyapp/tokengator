import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { Wallet } from '@tokengator/sdk'
import { WalletUiAvatar } from './wallet-ui-avatar'

export function WalletUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  wallet,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  wallet?: Wallet
  to?: string | null
}) {
  if (!wallet) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <WalletUiAvatar wallet={wallet} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {wallet?.name}
          </Text>
          <Text ff="mono" size="xs" c="dimmed">
            {wallet?.publicKey}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
