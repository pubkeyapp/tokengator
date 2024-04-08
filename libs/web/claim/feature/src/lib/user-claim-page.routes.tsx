import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Detail = lazy(() => import('./user-claim-page-detail.feature'))
const Provider = lazy(() => import('./user-claim-page-provider.feature'))
const List = lazy(() => import('./user-claim-page-list.feature'))

export default function UserClaimPageRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: ':provider/:providerId', element: <Provider /> },
    { path: ':claimId/*', element: <Detail /> },
  ])
}
