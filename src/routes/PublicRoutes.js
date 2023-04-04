import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const Page404 = Loadable(lazy(() => import('views/404Page/Page404')));
const LandingPage = Loadable(lazy(() => import('views/LandingPage/index')));
const RegisterOTP = Loadable(lazy(() => import('views/pages/authentication/authentication3/RegisterOTP')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const PublicRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin3 />
        },
        {
            path: '/register',
            element: <AuthRegister3 />
        },
        {
            path: '*',
            element: <Page404 />
        },
        {
            path: '/landingpage',
            element: <LandingPage />
        },
        {
            path: '/register/:token',
            element: <RegisterOTP />
        }
    ]
};

export default PublicRoutes;
