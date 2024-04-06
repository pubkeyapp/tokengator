import { Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiHeader, UiLayout, UiLoader } from '@pubkey-ui/core'
import { useAuth } from '@tokengator/web-auth-data-access'
import { AppLogo, AppLogoType, UiHeaderProfile } from '@tokengator/web-core-ui'
import {
  SolanaUiAccountBalanceButton,
  SolanaUiAccountChecker,
  SolanaUiClusterChecker,
  SolanaUiClusterSelect,
  WalletIcon,
} from '@tokengator/web-solana-ui'
import { ReactNode, Suspense } from 'react'

export function WebCoreLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <UiLayout
      header={
        <UiHeader
          logoSmall={<AppLogo height={40} />}
          logo={<AppLogoType height={28} />}
          opened={opened}
          toggle={toggle}
          links={[
            { link: '/dashboard', label: 'Dashboard' },
            { link: '/presets', label: 'Presets' },
            { link: '/c', label: 'Communities' },
          ]}
          profile={
            <Group gap="xs">
              <SolanaUiAccountBalanceButton />
              <SolanaUiClusterSelect />
              <WalletIcon />
              <UiHeaderProfile user={user} logout={logout} />
            </Group>
          }
        />
      }
    >
      <SolanaUiClusterChecker>
        <SolanaUiAccountChecker />
      </SolanaUiClusterChecker>
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </UiLayout>
  )
}
