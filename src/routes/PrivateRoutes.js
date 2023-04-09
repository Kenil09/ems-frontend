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

// page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Departments = Loadable(lazy(() => import('views/Department')));
const Designations = Loadable(lazy(() => import('views/Designation')));
const Employees = Loadable(lazy(() => import('views/Employee')));
const Tasks = Loadable(lazy(() => import('views/Task')));
const Shifts = Loadable(lazy(() => import('views/Shift')));
const Attendences = Loadable(lazy(() => import('views/Attendence')));
const Leave = Loadable(lazy(() => import('views/Leave')));
const Profile = Loadable(lazy(() => import('views/Profile')));
const Notification = Loadable(lazy(() => import('views/Notification')));

// ==============================|| MAIN ROUTING ||============================== //
const Roles = ['admin', 'teamMember', 'teamIncharge', 'manager'];

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        // {
        //     path: '/',
        //     element: <DashboardDefault />,
        //     role: Roles
        // },
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
            path: '/',
            element: <Employees />,
            role: Roles
        },
        {
            path: '/tasks',
            element: <Tasks />,
            role: Roles
        },
        {
            path: '/leave',
            element: <Leave />,
            role: Roles
        },
        {
            path: '/shifts',
            element: <Shifts />,
            role: Roles
        },
        {
            path: '/attendences',
            element: <Attendences />,
            role: Roles
        },
        {
            path: '/profile',
            element: <Profile />,
            role: Roles
        },
        {
            path: '/notification',
            element: <Notification />,
            role: Roles
        }
    ]
};

export default MainRoutes;
