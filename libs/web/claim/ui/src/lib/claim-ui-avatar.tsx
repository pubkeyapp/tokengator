import { Claim } from '@tokengator-mint/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type ClaimUiAvatarProps = UiAvatarProps & {
  claim?: Claim
}

export function ClaimUiAvatar({ claim, ...props }: ClaimUiAvatarProps) {
  return <UiAvatar url={undefined} name={claim?.name} {...props} />
}
