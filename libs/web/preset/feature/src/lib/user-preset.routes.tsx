import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Detail = lazy(() => import('./user-preset-detail.feature'))
const List = lazy(() => import('./user-preset-list.feature'))

export default function UserPresetRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: ':presetId/*', element: <Detail /> },
  ])
}
