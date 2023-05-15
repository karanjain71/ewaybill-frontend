import { isLoggedIn } from "@/helpers/util.js";
import Vue from "vue";
import Router from "vue-router";
import routes from "./routes.js";
// import {isLoggedIn} from "./../helpers/util"

Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "vue-school-active-class",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 140 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }

        return false;
      }
    }
  },
  routes
});
// eslint-disable-next-line
// router.beforeEach((to, from, next) => {
//   // const ewaybillToken = localStorage.getItem('ewaybillToken')
//   console.log(to)
//   console.log(to.meta.layout)
//   if(isLoggedIn()){
//     if(to.meta.layout==="AuthLayout"){
//       next()
//     }
//     else{
//       next({
//         path: "/"
//       })
//     }
//   }
//   else{
//       next({
//         path: "/login"
//       })
//   }
// })
router.beforeEach((to, from, next) => {
  // const ewaybillToken = localStorage.getItem('ewaybillToken')
  if (to.meta.layout === "AuthLayout") {
    if (!isLoggedIn()) {
        next({
            path: "/login",
            query: { redirect: to.fullPath }
        });
    } else {
        next();
    }
  } else {
    console.log("coming here" + to)
    if(to.name === "LoginPage" && isLoggedIn()){
      router.push("/")
    }
    else{
      next();
    }
  }
})


export default router;
