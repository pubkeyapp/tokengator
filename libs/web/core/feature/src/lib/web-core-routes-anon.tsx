import { AnonCommunityFeature } from '@tokengator-mint/web-community-feature'
import { RouteObject } from 'react-router-dom'

export const webCoreRoutesAnon: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/communities/*', element: <AnonCommunityFeature /> },
]
