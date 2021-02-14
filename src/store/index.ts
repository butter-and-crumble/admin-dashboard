import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '@/plugins/firebase.ts'
import userModule from '@/store/modules/UserModule'
import ordersModule from '@/store/modules/OrdersModule'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user: userModule,
        orders: ordersModule
    }
})


fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('user/setCurrentUser', user)
    store.commit('orders/setOrders')
  }
})



export default store
