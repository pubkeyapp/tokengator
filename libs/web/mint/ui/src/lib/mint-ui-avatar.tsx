import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'
import { Mint } from '@tokengator-mint/sdk'

export type MintUiAvatarProps = UiAvatarProps & {
  mint?: Mint
}

export function MintUiAvatar({ mint, ...props }: MintUiAvatarProps) {
  return <UiAvatar url={mint?.imageUrl} name={mint?.name} {...props} />
}
