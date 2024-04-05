import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./user-claim-create.feature'))
const Detail = lazy(() => import('./user-claim-detail.feature'))
const List = lazy(() => import('./user-claim-list.feature'))

export default function UserClaimRoutes({ communityId, account }: { communityId: string; account: string }) {
  return useRoutes([
    { path: '', element: <List communityId={communityId} account={account} /> },
    { path: 'create', element: <Create communityId={communityId} account={account} /> },
    { path: ':claimId/*', element: <Detail /> },
  ])
}
