import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Library from '../views/library/Library.vue';
import Fiction from '../views/library/Fiction.vue';

Vue.use(VueRouter)

const routes = [
    /*{
      path: '/',
      name: 'Home',
      component: Home
    },*/
    {
        path: '/',
        name: 'Library',
        component: Library
    },
    {
        path:'/fiction',
        name:'Fiction',
        component:Fiction
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
