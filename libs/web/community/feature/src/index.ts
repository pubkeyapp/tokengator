import { lazy } from 'react'

export const AdminCommunityFeature = lazy(() => import('./lib/admin-community.routes'))
export const AnonCommunityFeature = lazy(() => import('./lib/anon-community.routes'))
export const UserCommunityFeature = lazy(() => import('./lib/user-community.routes'))
