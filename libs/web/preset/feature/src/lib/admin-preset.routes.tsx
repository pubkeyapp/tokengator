import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-preset-create.feature'))
const Detail = lazy(() => import('./admin-preset-detail.feature'))
const List = lazy(() => import('./admin-preset-list.feature'))

export default function AdminPresetRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: 'create', element: <Create /> },
    { path: ':presetId/*', element: <Detail /> },
  ])
}
