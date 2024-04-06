import { UiInfo } from '@pubkey-ui/core'
import { useRoutes } from 'react-router-dom'
import { UserAssetDetailFeature } from './user-asset-detail-feature'

export default function UserAssetRoutes() {
  return useRoutes([
    { path: '', element: <UserAssetListFeature /> },
    { path: ':account/*', element: <UserAssetDetailFeature /> },
  ])
}

function UserAssetListFeature() {
  return <UiInfo title="Work in Progress" message="TBD" />
}
