import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import {ProtectedComponent} from "../../components/ProtectedComponent.tsx";
import {MainLayout} from "../../components/Layout/MainLayout.tsx";

const DashboardPage = lazy(() =>
    import('./features/tickets/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

const ProfilPage = lazy(() =>
    import('./features/tickets/pages/ProfilePage.tsx').then((m) => ({ default: m.ProfilePage }))
);

const NotFoundPage = lazy(() =>
    import('./features/tickets/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

export const mainRoutes: RouteObject[] = [
    {
        path: '/',
        element: (
            <ProtectedComponent>
                <MainLayout/>
            </ProtectedComponent>
        ),
        children: [
            { index: true, element: <DashboardPage /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'profil', element: <ProfilPage /> },
            { path: 'services/:serviceId', element: <DashboardPage /> },
            { path: 'souscriptions/*', element: <DashboardPage /> },
            { path: 'wallet/*', element: <DashboardPage /> },
            { path: 'preuves', element: <DashboardPage /> },
            { path: 'affiliation', element: <DashboardPage /> },
            { path: 'agence', element: <DashboardPage /> },
            { path: 'parametres', element: <DashboardPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
];
