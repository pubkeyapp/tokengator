import { useRoutes } from 'react-router-dom'
import { UserCommunityCreateFeature } from './user-community-create.feature'
import { UserCommunityDetailFeature } from './user-community-detail.feature'
import { UserCommunityListFeature } from './user-community-list.feature'

export default function UserCommunityRoutes() {
  return useRoutes([
    { path: '', element: <UserCommunityListFeature /> },
    {
      path: 'create',
      element: <UserCommunityCreateFeature />,
    },
    { path: ':slug/*', element: <UserCommunityDetailFeature /> },
  ])
}
