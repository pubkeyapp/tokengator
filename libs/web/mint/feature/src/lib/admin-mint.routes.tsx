import { useRoutes } from 'react-router-dom'
import { AdminMintDetailFeature } from './admin-mint-detail.feature'
import { AdminMintListFeature } from './admin-mint-list.feature'

export default function AdminMintRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <AdminMintListFeature communityId={communityId} /> },
    { path: ':mintId/*', element: <AdminMintDetailFeature /> },
  ])
}
