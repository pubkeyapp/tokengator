import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'
import { Claim } from '@tokengator/sdk'

export type ClaimUiAvatarProps = UiAvatarProps & {
  claim?: Claim
}

export function ClaimUiAvatar({ claim, ...props }: ClaimUiAvatarProps) {
  return <UiAvatar url={undefined} name={claim?.name} {...props} />
}
