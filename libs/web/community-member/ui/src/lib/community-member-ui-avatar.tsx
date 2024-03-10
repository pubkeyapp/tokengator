import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'
import { CommunityMember } from '@tokengator-mint/sdk'

export type CommunityMemberUiAvatarProps = UiAvatarProps & {
  communityMember?: CommunityMember
}

export function CommunityMemberUiAvatar({ communityMember, ...props }: CommunityMemberUiAvatarProps) {
  return <UiAvatar url={undefined} name={communityMember?.role} {...props} />
}
