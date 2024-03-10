import { Box, Group } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { AppLogoType } from '@tokengator-mint/web-core-ui'
import { ReactNode } from 'react'
import { AuthUiEnabled } from './auth-ui-enabled'
import { AuthUiFull } from './auth-ui-full'

export function AuthUiPage({ authEnabled, children }: { authEnabled: boolean; children: ReactNode }) {
  return (
    <AuthUiFull>
      <AuthUiEnabled authEnabled={authEnabled}>
        <Box miw={400} p="lg">
          <UiStack gap={48}>
            <Group justify="center">
              <AppLogoType height={48} />
            </Group>
            {children}
          </UiStack>
        </Box>
      </AuthUiEnabled>
    </AuthUiFull>
  )
}
