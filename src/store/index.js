import Vue from "vue";
import Vuex from "vuex";
import notifications from "./notifications";
import userDetails from "./userData";
import payments from "./payments";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notifications,
    userDetails,
    payments,
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,
});
