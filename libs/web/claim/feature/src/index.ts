import { lazy } from 'react'

export const AdminClaimFeature = lazy(() => import('./lib/admin-claim.routes'))
export const UserClaimFeature = lazy(() => import('./lib/user-claim.routes'))
export const UserClaimPageFeature = lazy(() => import('./lib/user-claim-page.routes'))
