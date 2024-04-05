import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./user-claim-create.feature'))
const Detail = lazy(() => import('./user-claim-detail.feature'))
const List = lazy(() => import('./user-claim-list.feature'))

export default function UserClaimRoutes({ communityId, minter }: { communityId: string; minter: string }) {
  return useRoutes([
    { path: '', element: <List communityId={communityId} minter={minter} /> },
    { path: 'create', element: <Create communityId={communityId} minter={minter} /> },
    { path: ':claimId/*', element: <Detail /> },
  ])
}
