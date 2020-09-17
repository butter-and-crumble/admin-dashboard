import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '@/plugins/firebase.ts'
import userModule from '@/store/modules/UserModule'
import { Module } from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user: userModule
    }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('user/setCurrentUser', user)
  }
})



export default store
