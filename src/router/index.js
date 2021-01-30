import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Library from '../views/library/Library';
import Fiction from '../views/library/Fiction';
import Chapter from '../views/library/Chapter';
import Directory from '../views/library/Directory';
import SignIn from '../views/user/SignIn';
import SignUp from '../views/user/SignUp';
import UCenter from '../views/user/UCenter';
import Forum from '../views/forum/Forum';
import Topic from '../views/forum/Topic';
import Notice from '../views/forum/Notice'
import NewTopic from '../views/forum/NewTopic';
import NewFiction from '../views/library/NewFiction';
import NewChapter from '../views/library/NewChapter';
import Manage from '../views/library/Manage';
import Setting from '../views/user/Setting';
import Error from "@/views/error/Error";

/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
};

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/library',
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
    },
    {
        path: '/UCenter',
        name: 'UCenter',
        component: UCenter
    },
    {
        path: '/forum',
        name: 'Forum',
        component: Forum
    },
    {
        path: '/topic',
        name: 'Topic',
        component: Topic
    },
    {
        path: '/notice',
        name: 'Notice',
        component: Notice
    },
    {
        path: '/new/topic',
        name: 'NewTopic',
        component: NewTopic
    },
    {
        path: '/new/fiction',
        name: 'NewFiction',
        component: NewFiction
    },
    {
        path: '/new/chapter',
        name: 'NewChapter',
        component: NewChapter
    },
    {
        path: '/manage',
        name: 'Manage',
        component: Manage
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting
    },
    {
        path: "/error",
        name:"Error",
        component: Error
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
