import { useRoutes } from 'react-router-dom'
import { AnonCommunityDetailFeature } from './anon-community-detail.feature'
import { AnonCommunityListFeature } from './anon-community-list.feature'

export default function UserCommunityRoutes() {
  return useRoutes([
    { path: '', element: <AnonCommunityListFeature /> },
    { path: ':slug/*', element: <AnonCommunityDetailFeature /> },
  ])
}
