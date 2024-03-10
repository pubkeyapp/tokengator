import { lazy } from 'react'

export const AdminMintFeature = lazy(() => import('./lib/admin-mint.routes'))
export const UserMintFeature = lazy(() => import('./lib/user-mint.routes'))
