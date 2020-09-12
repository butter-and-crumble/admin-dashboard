import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '@/plugins/firebase.ts'
import { Module } from "vuex";

Vue.use(Vuex);

const userModule: Module<any, any> = {
    namespaced: true,
    state: {
        currentUser: Object
    },
    getters: {
        getCurrentUser: state => {
            return state.currentUser
        }
    },
    mutations: {
        setCurrentUser (state, user) {
          state.currentUser = user
        },
    },
    actions: {
        setCurrentUser (context, user: Record<string, any>) {
            context.commit('setCurrentUser', user)
        },
    }
}


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
