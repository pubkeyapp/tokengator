import { useRoutes } from 'react-router-dom'
import { AdminCommunityDetailFeature } from './admin-community-detail.feature'
import { AdminCommunityListFeature } from './admin-community-list.feature'

export default function AdminCommunityRoutes() {
  return useRoutes([
    { path: '', element: <AdminCommunityListFeature /> },
    { path: ':communityId/*', element: <AdminCommunityDetailFeature /> },
  ])
}
