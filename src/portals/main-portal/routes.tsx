import type { RouteObject } from 'react-router-dom';
//import {ProtectedComponent} from "../../components/ProtectedComponent.tsx";
import {MainLayout} from "../../components/Layout/MainLayout.tsx";
import {AviLandingPage, AviStepPage, DashboardPage, NotFoundPage, ProfilePage} from "./index.tsx";
export const mainRoutes: RouteObject[] = [
    {
        path: '/',
        element: (
            <MainLayout />
        ),
        children: [
            { index: true, element: <DashboardPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'settings', element: <DashboardPage /> },
            { path: 'parameters', element: <DashboardPage /> },
            { path: 'avi', element: <AviLandingPage /> },
            { path: 'avi/:id', element: <AviStepPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
];
