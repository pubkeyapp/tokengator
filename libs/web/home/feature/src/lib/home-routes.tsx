import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const LazyHomeFeature = lazy(() => import('./pages/home-page'))

export const webHomeRoutes: RouteObject[] = [
  // More routes can be added here
  { path: '/home', element: <LazyHomeFeature /> },
]
