import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import("../views/Home.vue");
const Library = () => import("../views/library/Library");
const Fiction = () => import("../views/library/Fiction");
const Chapter = () => import("../views/library/Chapter");
const Directory = () => import("../views/library/Directory");
const SignIn = () => import("../views/user/SignIn");
const SignUp = () => import("../views/user/SignUp");
const UCenter = () => import("../views/user/UCenter");
const Forum = () => import("../views/forum/Forum");
const Topic = () => import("../views/forum/Topic");
const Notice = () => import("../views/forum/Notice");
const NewTopic = () => import("../views/forum/NewTopic");
const NewFiction = () => import("../views/library/NewFiction");
const NewChapter = () => import("../views/library/NewChapter");
const Manage = () => import("../views/library/Manage");
const Setting = () => import("../views/user/Setting");
const Error = () => import("@/views/error/Error");

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
        name: "Error",
        component: Error
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
