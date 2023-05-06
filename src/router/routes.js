import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import PageNotFound from '../components/PageNotFound.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import DashboardPage from '../components/DashboardPage.vue';
import CreateEwaybill from '../components/CreateEwaybill.vue';
import ArchivedEwaybills from '../components/ArchivedEwaybills.vue';
import UserProfile from '../components/UserProfile.vue';

const routes = [
    {
        path: '/',
        name: 'AuthLayout',
        component: () => import('../layouts/AuthLayout.vue'),
        children: [
            {
                path: '/',
                name: 'DashboardPage',
                meta: {
                    layout: 'AuthLayout',
                },
                component: DashboardPage
            },
            {
                path: '/create-ewaybill',
                name: 'CreateEwaybill',
                meta: {
                    layout: 'AuthLayout',
                },
                component: CreateEwaybill
            },
            {
                path: '/archived-ewaybills',
                name: 'ArchivedEwaybills',
                meta: {
                    layout: 'AuthLayout',
                },
                component: ArchivedEwaybills
            },
            {
                path: '/profile',
                name: 'UserProfile',
                meta: {
                    layout: 'AuthLayout',
                },
                component: UserProfile
            },
        ]
    },
    {
        path: '/login',
        name: 'LoginPage',
        meta: {
            layout: 'NonAuthLayout',
        },
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'RegisterPage',
        meta: {
            layout: 'NonAuthLayout',
        },
        component: RegisterPage,
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        meta: {
            layout: 'NonAuthLayout',
        },
        component: ForgotPassword,
    },
    {
        path: '/*',
        name: 'PageNotFound',
        meta: {
            layout: 'NonAuthLayout',
        },
        component: PageNotFound,
    },
];

export default routes;