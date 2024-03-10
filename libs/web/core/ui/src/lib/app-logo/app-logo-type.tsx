import { UiLogoTypeProps, useUiColorScheme } from '@pubkey-ui/core'
import { AppLogoTypeBlack } from './app-logo-type-black'
import { AppLogoTypeWhite } from './app-logo-type-white'

export function AppLogoType(props: UiLogoTypeProps = {}) {
  const { colorScheme } = useUiColorScheme()

  return colorScheme === 'dark' ? <AppLogoTypeWhite {...props} /> : <AppLogoTypeBlack {...props} />
}
