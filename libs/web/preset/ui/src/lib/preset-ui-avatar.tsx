import { Preset } from '@tokengator-mint/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type PresetUiAvatarProps = UiAvatarProps & {
  preset?: Preset
}

export function PresetUiAvatar({ preset, ...props }: PresetUiAvatarProps) {
  return <UiAvatar url={undefined} name={preset?.name} {...props} />
}
