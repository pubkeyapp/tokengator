import { lazy } from 'react'
export const AdminPresetFeature = lazy(() => import('./lib/admin-preset.routes'))

export const UserPresetFeature = lazy(() => import('./lib/user-preset.routes'))
