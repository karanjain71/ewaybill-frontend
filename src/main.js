import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index';
import store from './store/index'
import '@/assets/scss/theme.scss'


Vue.config.productionTip = false
Vue.config.devtools = true

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production'){
  const {worker} = require('./mocks')
  worker.start()
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')