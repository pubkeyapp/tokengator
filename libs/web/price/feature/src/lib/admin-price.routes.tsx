import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-price-create.feature'))
const List = lazy(() => import('./admin-price-list.feature'))

export default function AdminPriceRoutes({ presetId }: { presetId: string }) {
  return useRoutes([
    { path: '', element: <List presetId={presetId} /> },
    { path: 'create', element: <Create presetId={presetId} /> },
  ])
}
