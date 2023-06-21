import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";
import PageNotFound from "../components/PageNotFound.vue";
import ForgotPassword from "../components/ForgotPassword.vue";
import DashboardPage from "../components/DashboardPage.vue";
import CreateEwaybill from "../components/CreateEwaybill.vue";
import ArchivedEwaybills from "../components/ArchivedEwaybills.vue";
import UserProfile from "../components/UserProfile.vue";
import ResetPassword from "../components/ResetPassword.vue";
import WelcomePage from "../components/WelcomePage.vue";
import RenewPlan from "../components/RenewPlan.vue";
import PricingPage from "../components/PricingPage.vue";
import MyTransactions from "../components/MyTransactions.vue";

const routes = [
  {
    path: "/",
    name: "AuthLayout",
    component: () => import("../layouts/AuthLayout.vue"),
    children: [
      {
        path: "/",
        name: "DashboardPage",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: DashboardPage,
      },
      {
        path: "/create-ewaybill",
        name: "CreateEwaybill",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: CreateEwaybill,
      },
      {
        path: "/archived-ewaybills",
        name: "ArchivedEwaybills",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: ArchivedEwaybills,
      },
      {
        path: "/profile",
        name: "UserProfile",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: UserProfile,
      },
      {
        path: "/renew-plan",
        name: "RenewPlan",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: RenewPlan,
      },
      {
        path: "/transactions",
        name: "MyTransactions",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: MyTransactions,
      },
      {
        path: "/welcome-page",
        name: "WelcomePage",
        meta: {
          protected: true,
          layout: "NonAuthLayout",
        },
        component: WelcomePage,
      },
    ],
  },
  {
    path: "/login",
    name: "LoginPage",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: RegisterPage,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: ForgotPassword,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: ResetPassword,
  },
  {
    path: "/pricing",
    name: "Pricing",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: PricingPage,
  },
  {
    path: "/*",
    name: "PageNotFound",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: PageNotFound,
  },
];

export default routes;
