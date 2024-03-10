import { useRoutes } from 'react-router-dom'
import { UserMintDetailFeature } from './user-mint-detail.feature'
import { UserMintCreateFeature } from './user-mint-create.feature'
import { UserMintListFeature } from './user-mint-list.feature'

export default function UserMintRoutes() {
  return useRoutes([
    { path: '', element: <UserMintListFeature /> },
    {
      path: 'create',
      element: <UserMintCreateFeature />,
    },
    { path: ':mintId/*', element: <UserMintDetailFeature /> },
  ])
}
