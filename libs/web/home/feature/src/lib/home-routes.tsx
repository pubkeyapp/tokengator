import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const LazyHomeFeature = lazy(() => import('./pages/home-page'))
const LazyAboutPage = lazy(() => import('./pages/about-page'))

export const webHomeRoutes: RouteObject[] = [
  { path: '/home', element: <LazyHomeFeature /> },
  { path: '/about', element: <LazyAboutPage /> },
]
