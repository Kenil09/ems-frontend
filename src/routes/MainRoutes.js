import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import UserList from 'views/User/UserList';
import AddUser from 'views/User/AddUser';
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
            path: 'userlist',
            element: <UserList />,
            role: Roles
        },
        {
            path: 'adduser',
            element: <AddUser />,
            role: Roles
        }
    ]
};

export default MainRoutes;
