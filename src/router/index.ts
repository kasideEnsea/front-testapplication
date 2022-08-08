import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {SecurityService} from "@/security/SecurityService";
import NoValidView from "@/views/NoValidView/NoValidView.vue";
import ValidView from "@/views/ValidView/ValidView.vue";
import MainView from "@/views/MainView/MainView.vue";
const LoginView = () => import( "@/views/LoginView/LoginView.vue");
const RegistrationView = () => import("@/views/RegistrationView/RegistrationView.vue");
const PageNotFoundView = () => import( "@/views/PageNotFoundView/PageNotFoundView.vue");


Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'MainView',
        component: MainView,
        meta: {
            authorized: true
        }
    },
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/registration',
        name: 'RegistrationView',
        component: RegistrationView
    },
    {
        path: '/novalid',
        name: 'NoValidView',
        component: NoValidView,
        meta: {
            authorized: false
        }
    },
    {
        path: '/:userId?/:code?',
        name: 'ValidView',
        component: ValidView,
        /*children: [
            { path: '/:code?',
                name: 'ValidView',
                component: ValidView },
        ]*/
    },{
        path: '/logout',
        beforeEnter: (to, from, next) => {
            SecurityService.clearToken();
            next('/login');
        }
    }, {
        path: '/*',
        name: 'PageNotFoundView',
        component: PageNotFoundView
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.authorized && !SecurityService.isAuthorized()){
        next('/login');
    } else next()
});

export default router
