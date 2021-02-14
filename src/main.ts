import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from '@/plugins/firebase.ts'
import vuetify from './plugins/vuetify';
import VCalendar from 'v-calendar';
import moment from 'moment';

Vue.config.productionTip = false

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use( VCalendar )
Vue.prototype.moment = moment

let app: any
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
