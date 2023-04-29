import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import PageNotFound from '../components/PageNotFound.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import DashboardPage from '../components/DashboardPage.vue';
import CreateEwaybill from '../components/CreateEwaybill.vue';
import ArchivedEwaybills from '../components/ArchivedEwaybills.vue';

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
        ]
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage,
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
    },
    {
        path: '/*',
        name: 'PageNotFound',
        component: PageNotFound,
    },
];

export default routes;