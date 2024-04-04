import { lazy } from 'react'
export const AdminPriceFeature = lazy(() => import('./lib/admin-price.routes'))

export const UserPriceFeature = lazy(() => import('./lib/user-price.routes'))
