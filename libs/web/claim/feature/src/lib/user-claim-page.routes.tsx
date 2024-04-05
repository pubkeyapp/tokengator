import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Detail = lazy(() => import('./user-claim-page-detail.feature'))
const List = lazy(() => import('./user-claim-page-list.feature'))

export default function UserClaimPageRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: ':claimId/*', element: <Detail /> },
  ])
}
