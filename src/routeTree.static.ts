/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// Snapshot of the route tree for builds where the TanStack router plugin
// crawl output is unavailable. Keep this in sync with src/routes.

import { Route as rootRouteImport } from './routes/__root'
import { Route as TarotRouteImport } from './routes/tarot'
import { Route as ProfileRouteImport } from './routes/profile'
import { Route as PalmRouteImport } from './routes/palm'
import { Route as OnboardingRouteImport } from './routes/onboarding'
import { Route as HoroscopeRouteImport } from './routes/horoscope'
import { Route as FaceRouteImport } from './routes/face'
import { Route as CompatibilityRouteImport } from './routes/compatibility'
import { Route as IndexRouteImport } from './routes/index'

const TarotRoute = TarotRouteImport.update({
  id: '/tarot',
  path: '/tarot',
  getParentRoute: () => rootRouteImport,
} as any)
const ProfileRoute = ProfileRouteImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRouteImport,
} as any)
const PalmRoute = PalmRouteImport.update({
  id: '/palm',
  path: '/palm',
  getParentRoute: () => rootRouteImport,
} as any)
const OnboardingRoute = OnboardingRouteImport.update({
  id: '/onboarding',
  path: '/onboarding',
  getParentRoute: () => rootRouteImport,
} as any)
const HoroscopeRoute = HoroscopeRouteImport.update({
  id: '/horoscope',
  path: '/horoscope',
  getParentRoute: () => rootRouteImport,
} as any)
const FaceRoute = FaceRouteImport.update({
  id: '/face',
  path: '/face',
  getParentRoute: () => rootRouteImport,
} as any)
const CompatibilityRoute = CompatibilityRouteImport.update({
  id: '/compatibility',
  path: '/compatibility',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/compatibility': typeof CompatibilityRoute
  '/face': typeof FaceRoute
  '/horoscope': typeof HoroscopeRoute
  '/onboarding': typeof OnboardingRoute
  '/palm': typeof PalmRoute
  '/profile': typeof ProfileRoute
  '/tarot': typeof TarotRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/compatibility': typeof CompatibilityRoute
  '/face': typeof FaceRoute
  '/horoscope': typeof HoroscopeRoute
  '/onboarding': typeof OnboardingRoute
  '/palm': typeof PalmRoute
  '/profile': typeof ProfileRoute
  '/tarot': typeof TarotRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/compatibility': typeof CompatibilityRoute
  '/face': typeof FaceRoute
  '/horoscope': typeof HoroscopeRoute
  '/onboarding': typeof OnboardingRoute
  '/palm': typeof PalmRoute
  '/profile': typeof ProfileRoute
  '/tarot': typeof TarotRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/compatibility'
    | '/face'
    | '/horoscope'
    | '/onboarding'
    | '/palm'
    | '/profile'
    | '/tarot'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/compatibility'
    | '/face'
    | '/horoscope'
    | '/onboarding'
    | '/palm'
    | '/profile'
    | '/tarot'
  id:
    | '__root__'
    | '/'
    | '/compatibility'
    | '/face'
    | '/horoscope'
    | '/onboarding'
    | '/palm'
    | '/profile'
    | '/tarot'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CompatibilityRoute: typeof CompatibilityRoute
  FaceRoute: typeof FaceRoute
  HoroscopeRoute: typeof HoroscopeRoute
  OnboardingRoute: typeof OnboardingRoute
  PalmRoute: typeof PalmRoute
  ProfileRoute: typeof ProfileRoute
  TarotRoute: typeof TarotRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/tarot': {
      id: '/tarot'
      path: '/tarot'
      fullPath: '/tarot'
      preLoaderRoute: typeof TarotRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/palm': {
      id: '/palm'
      path: '/palm'
      fullPath: '/palm'
      preLoaderRoute: typeof PalmRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/onboarding': {
      id: '/onboarding'
      path: '/onboarding'
      fullPath: '/onboarding'
      preLoaderRoute: typeof OnboardingRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/horoscope': {
      id: '/horoscope'
      path: '/horoscope'
      fullPath: '/horoscope'
      preLoaderRoute: typeof HoroscopeRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/face': {
      id: '/face'
      path: '/face'
      fullPath: '/face'
      preLoaderRoute: typeof FaceRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/compatibility': {
      id: '/compatibility'
      path: '/compatibility'
      fullPath: '/compatibility'
      preLoaderRoute: typeof CompatibilityRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CompatibilityRoute: CompatibilityRoute,
  FaceRoute: FaceRoute,
  HoroscopeRoute: HoroscopeRoute,
  OnboardingRoute: OnboardingRoute,
  PalmRoute: PalmRoute,
  ProfileRoute: ProfileRoute,
  TarotRoute: TarotRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { createStart } from '@tanstack/react-start'

declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
