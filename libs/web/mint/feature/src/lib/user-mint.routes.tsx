import { useRoutes } from 'react-router-dom'
import { UserMintCreateFeature } from './user-mint-create.feature'
import { UserMintDetailFeature } from './user-mint-detail.feature'
import { UserMintListFeature } from './user-mint-list.feature'

export default function UserMintRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <UserMintListFeature communityId={communityId} /> },
    {
      path: 'create',
      element: <UserMintCreateFeature communityId={communityId} />,
    },
    { path: ':mintId/*', element: <UserMintDetailFeature /> },
  ])
}
