import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import store from "./store/index";
import "@/assets/scss/theme.scss";
import VueLogger from "vuejs-logger";

Vue.config.productionTip = false;
Vue.config.devtools = true;

// if(process.env.NODE_ENV === 'localhost'){
//   const {worker} = require('./mocks')
//   worker.start()
// }
// const isProduction = process.env.NODE_ENV === 'production';

const options = {
  isEnabled: true,
  stringifyArguments: true,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true,
};
// import GoogleAuth from "@/configs/google_oAuth.js";
// const gauthOption = {
//   clientId:
//     "1077378445609-619i4d5r5kaj12ju2of1bbv3ea13ukbl.apps.googleusercontent.com",
//   scope: "profile email",
//   prompt: "select_account",
// };
// Vue.use(GoogleAuth, gauthOption);

Vue.use(VueLogger, options);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
