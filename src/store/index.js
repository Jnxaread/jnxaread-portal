import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        content: ''
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setContent(state, content) {
            state.content = content;
        }
    },
    getters: {
        isLogin(state) {
            return state.user != null;
        },
        getUser(state) {
            return state.user;
        },
        getContent(state) {
            return state.content;
        }
    },
    actions: {},
    modules: {}
})
