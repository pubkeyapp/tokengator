import { lazy } from 'react'
export const AdminWalletFeature = lazy(() => import('./lib/admin-wallet.routes'))

export const UserWalletFeature = lazy(() => import('./lib/user-wallet.routes'))
