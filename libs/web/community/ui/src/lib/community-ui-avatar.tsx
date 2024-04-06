import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'
import { Community } from '@tokengator/sdk'

export type CommunityUiAvatarProps = UiAvatarProps & {
  community?: Community
}

export function CommunityUiAvatar({ community, ...props }: CommunityUiAvatarProps) {
  return <UiAvatar url={community?.imageUrl} name={community?.name} {...props} />
}
