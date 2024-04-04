import { Price } from '@tokengator-mint/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type PriceUiAvatarProps = UiAvatarProps & {
  price?: Price
}

export function PriceUiAvatar({ price, ...props }: PriceUiAvatarProps) {
  return <UiAvatar url={undefined} name={price?.name} {...props} />
}
