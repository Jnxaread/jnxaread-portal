import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Library from '../views/library/Library';
import Fiction from '../views/library/Fiction';
import Chapter from '../views/library/Chapter';
import Directory from '../views/library/Directory';
import SignIn from '../views/user/SignIn';
import SignUp from '../views/user/SignUp';

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
        path: '/fiction',
        name: 'Fiction',
        component: Fiction
    },
    {
        path: '/chapter',
        name: 'Chapter',
        component: Chapter
    },
    {
        path: '/directory',
        name: 'Directory',
        component: Directory
    },
    {
        path: '/signIn',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/signUp',
        name: 'SignUp',
        component: SignUp
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
