import { Module } from "vuex";


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


export default userModule
