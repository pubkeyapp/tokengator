import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-claim-create.feature'))
const Detail = lazy(() => import('./admin-claim-detail.feature'))
const List = lazy(() => import('./admin-claim-list.feature'))

export default function AdminClaimRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <List communityId={communityId} /> },
    { path: 'create', element: <Create communityId={communityId} /> },
    { path: ':claimId/*', element: <Detail /> },
  ])
}
