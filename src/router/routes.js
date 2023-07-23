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
import TestingPage from "../components/TestingPage.vue";

const routes = [
  {
    path: "/",
    name: "AuthLayout",
    component: () => import("../layouts/AuthLayout.vue"),
    children: [
      {
        path: "/",
        name: "Dashboard",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: DashboardPage,
      },
      {
        path: "/create-ewaybill",
        name: "Create Ewaybill",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: CreateEwaybill,
      },
      {
        path: "/archived-ewaybills",
        name: "Archived Ewaybills",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: ArchivedEwaybills,
      },
      {
        path: "/profile",
        name: "User Profile",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: UserProfile,
      },
      {
        path: "/renew-plan",
        name: "Renew Plan",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: RenewPlan,
      },
      {
        path: "/transactions",
        name: "My Transactions",
        meta: {
          protected: true,
          layout: "AuthLayout",
        },
        component: MyTransactions,
      },
      {
        path: "/welcome-page",
        name: "Welcome",
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
    name: "Login",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: RegisterPage,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: ForgotPassword,
  },
  {
    path: "/reset-password",
    name: "Reset Password",
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
    path: "/testing",
    name: "Testing",
    meta: {
      protected: false,
      layout: "AuthLayout",
    },
    component: TestingPage,
  },
  {
    path: "/*",
    name: "Not Found",
    meta: {
      protected: false,
      layout: "NonAuthLayout",
    },
    component: PageNotFound,
  },
];

export default routes;
