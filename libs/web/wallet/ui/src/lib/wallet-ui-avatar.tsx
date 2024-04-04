import { Wallet } from '@tokengator-mint/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type WalletUiAvatarProps = UiAvatarProps & {
  wallet?: Wallet
}

export function WalletUiAvatar({ wallet, ...props }: WalletUiAvatarProps) {
  return <UiAvatar url={undefined} name={wallet?.name} {...props} />
}
