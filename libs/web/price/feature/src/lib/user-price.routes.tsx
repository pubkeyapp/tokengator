import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const List = lazy(() => import('./user-price-list.feature'))

export default function UserPriceRoutes({ presetId }: { presetId: string }) {
  return useRoutes([{ path: '', element: <List presetId={presetId} /> }])
}
