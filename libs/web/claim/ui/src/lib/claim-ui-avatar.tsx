import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'
import { Claim } from '@tokengator/sdk'

export type ClaimUiAvatarProps = UiAvatarProps & {
  claim?: Claim
}

export function ClaimUiAvatar({ claim, ...props }: ClaimUiAvatarProps) {
  return <UiAvatar url={claim?.avatarUrl} name={claim?.name} {...props} />
}
