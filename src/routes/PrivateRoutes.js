import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Leave from '../views/Leave/index';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Departments = Loadable(lazy(() => import('views/Department')));
const Designations = Loadable(lazy(() => import('views/Designations')));
const Employees = Loadable(lazy(() => import('views/Employee')));
const Attendance = Loadable(lazy(() => import('views/Attendance')));
const Shift = Loadable(lazy(() => import('views/Shift')));
///const LandingPage = Loadable(lazy(() => import('views/LandingPage')));
const Profile = Loadable(lazy(() => import('views/Profile')));
// ==============================|| MAIN ROUTING ||============================== //
const Roles = ['admin', 'teamMember', 'teamIncharge', 'manager'];

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
        },
        {
            path: '/employees',
            element: <Employees />,
            role: Roles
        },
        {
            path: '/leave',
            element: <Leave />,
            role: Roles
        },
        {
            path: '/attendance',
            element: <Attendance />,
            role: Roles
        },
        {
            path: '/shift',
            element: <Shift />,
            role: Roles
        },
        {
            path: '/profile',
            element: <Profile />,
            role: Roles
        }
    ]
};

export default MainRoutes;
