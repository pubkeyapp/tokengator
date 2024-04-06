import { BACKGROUND_COLORS, themeWithBrand, toastError, UiThemeLink, UiThemeProvider } from '@pubkey-ui/core'
import '@pubkey-ui/core/index.esm.css'
import 'mantine-datatable/styles.layer.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@tokengator/web-auth-data-access'
import { AppConfigProvider, SdkProvider } from '@tokengator/web-core-data-access'
import { SolanaClusterProvider } from '@tokengator/web-solana-data-access'
import { BrowserRouter, Link } from 'react-router-dom'
import { WebCoreRoutes } from './web-core-routes'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        toastError(`Something went wrong`)
      },
    },
  },
})

// eslint-disable-next-line func-style
export const ThemeLink: UiThemeLink = ({ children, ...props }) => <Link {...props}>{children}</Link>
const theme = themeWithBrand('green', { colors: { dark: BACKGROUND_COLORS['stone'] } })
export function WebCoreFeature() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <SdkProvider>
          <AppConfigProvider>
            <AuthProvider>
              <UiThemeProvider link={ThemeLink} theme={theme}>
                <SolanaClusterProvider>
                  <WebCoreRoutes />
                </SolanaClusterProvider>
              </UiThemeProvider>
            </AuthProvider>
          </AppConfigProvider>
        </SdkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
