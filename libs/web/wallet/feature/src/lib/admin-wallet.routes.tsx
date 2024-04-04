import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-wallet-create.feature'))
const Detail = lazy(() => import('./admin-wallet-detail.feature'))
const List = lazy(() => import('./admin-wallet-list.feature'))

export default function AdminWalletRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <List communityId={communityId} /> },
    { path: 'create', element: <Create communityId={communityId} /> },
    { path: ':walletId/*', element: <Detail /> },
  ])
}
