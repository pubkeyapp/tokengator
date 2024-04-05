import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./user-wallet-create.feature'))
const Detail = lazy(() => import('./user-wallet-detail.feature'))
const List = lazy(() => import('./user-wallet-list.feature'))

export default function UserWalletRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <List communityId={communityId} /> },
    { path: 'create', element: <Create communityId={communityId} /> },
    { path: ':publicKey/*', element: <Detail /> },
  ])
}
