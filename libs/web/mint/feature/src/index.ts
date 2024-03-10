import { lazy } from 'react'
export const UserMintFeature = lazy(() => import('./lib/user-mint.routes'))

export const AdminMintFeature = lazy(() => import('./lib/admin-mint.routes'))
