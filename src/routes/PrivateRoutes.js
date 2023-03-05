import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Departments = Loadable(lazy(() => import('views/Department')));
const Designations = Loadable(lazy(() => import('views/Designations')));

// ==============================|| MAIN ROUTING ||============================== //
const Roles = ['superAdmin', 'admin', 'manager', 'employee'];

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />,
            role: Roles
        },
        {
            path: 'sample-page',
            element: <SamplePage />,
            role: Roles
        },
        {
            path: '/designations',
            element: <Designations />,
            role: Roles
        },
        {
            path: '/departments',
            element: <Departments />,
            role: Roles
        }
    ]
};

export default MainRoutes;