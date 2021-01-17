import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        content: '',
        ownFictions: [],
        screenWidth: 1920,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setContent(state, content) {
            state.content = content;
        },
        setOwnFictions(state, ownFictions) {
            state.ownFictions = ownFictions;
        },
        setScreenWidth(state, screenWidth) {
            state.screenWidth = screenWidth;
        },
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
        },
        getOwnFictions(state) {
            return state.ownFictions;
        },
        getScreenWidth(state) {
            return state.screenWidth;
        },
    },
    actions: {},
    modules: {}
})
