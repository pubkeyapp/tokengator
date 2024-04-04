import { AvatarProps, Stack, StackProps, Text } from '@mantine/core'
import { UiAnchorProps } from '@pubkey-ui/core'
import { Price } from '@tokengator-mint/sdk'
import { PriceUiAvatar } from './price-ui-avatar'

export function PriceUiItem({
  avatarProps,
  stackProps,
  price,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  stackProps?: StackProps
  price?: Price
  to?: string | null
}) {
  if (!price) return null

  return (
    <Stack gap="sm" {...stackProps} align="center" w="100%">
      <PriceUiAvatar size="xl" price={price} {...avatarProps} />
      <Stack gap={1} align="center">
        <Text fz={64} fw={700}>
          {price?.price}
        </Text>
        <Text size="lg" fw={500}>
          {price?.name}
        </Text>
      </Stack>
    </Stack>
  )
}
