import { Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiHeader, UiLayout, UiLoader } from '@pubkey-ui/core'
import { useAuth } from '@tokengator-mint/web-auth-data-access'
import { AppLogo, AppLogoType, UiHeaderProfile } from '@tokengator-mint/web-core-ui'
import {
  SolanaUiAccountBalanceButton,
  SolanaUiAccountChecker,
  SolanaUiClusterChecker,
  SolanaUiClusterSelect,
  WalletIcon,
} from '@tokengator-mint/web-solana-ui'
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
            { link: '/solana', label: 'Solana' },
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
