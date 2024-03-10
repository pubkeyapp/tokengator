import { useRoutes } from 'react-router-dom'
import { AdminMintDetailFeature } from './admin-mint-detail.feature'
import { AdminMintCreateFeature } from './admin-mint-create.feature'
import { AdminMintListFeature } from './admin-mint-list.feature'

export default function AdminMintRoutes() {
  return useRoutes([
    { path: '', element: <AdminMintListFeature /> },
    {
      path: 'create',
      element: <AdminMintCreateFeature />,
    },
    { path: ':mintId/*', element: <AdminMintDetailFeature /> },
  ])
}
