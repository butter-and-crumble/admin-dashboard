import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from '@/plugins/firebase.ts'
import VCalendar from 'v-calendar';
import SmartTable from 'vuejs-smart-table'


Vue.config.productionTip = false
Vue.use( VCalendar )
Vue.use(SmartTable)


let app: any
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
