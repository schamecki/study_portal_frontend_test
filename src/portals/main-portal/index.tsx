import {lazy, Suspense} from "react";

const DashboardPageLazy = lazy(() => import('./features/tickets/pages/DashboardPage.tsx').then(m => ({ default: m.DashboardPage })));
const ProfilePageLazy = lazy(() => import('./features/tickets/pages/ProfilePage.tsx').then(m => ({ default: m.ProfilePage })));
const NotFoundPageLazy = lazy(() => import('./features/tickets/pages/NotFoundPage.tsx').then(m => ({ default: m.NotFoundPage })));
const AviLandingPageLazy = lazy(() => import('./features/avi/pages/AviLandingPage.tsx').then(m => ({ default: m.AviLandingPage })));
const AviStepPageLazy = lazy(() => import('./features/avi/pages/AviStepPage.tsx').then(m => ({ default: m.AviStepPage })));

export const DashboardPage = () => <Suspense fallback={null}><DashboardPageLazy /></Suspense>;
export const ProfilePage = () => <Suspense fallback={null}><ProfilePageLazy /></Suspense>;
export const NotFoundPage = () => <Suspense fallback={null}><NotFoundPageLazy /></Suspense>;
export const AviLandingPage = () => <Suspense fallback={null}><AviLandingPageLazy /></Suspense>;
export const AviStepPage = () => <Suspense fallback={null}><AviStepPageLazy /></Suspense>;