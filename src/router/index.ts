import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {SecurityService} from "@/security/SecurityService";
import NoValidView from "@/views/NoValidView/NoValidView.vue";
import ValidView from "@/views/ValidView/ValidView.vue";
import MainView from "@/views/MainView/MainView.vue";
import TestView from "@/views/TestView/TestView.vue";
import AddTestView from "@/views/AddTestView/AddTestView.vue";
import StudentLinkView from "@/views/StudentLinkView/StudentLinkView.vue";
import TestStudentView from "@/views/TestStudentView/TestStudentView.vue";
import NoValidTestLinkView from "@/views/NoValidTestLinkView/NoValidTestLinkView.vue";
import AttemptStudentView from "@/views/AttemptStudentView/AttemptStudentView.vue";
import AttemptTeacherView from "@/views/AttemptTeacherView/AttemptTeacherView.vue";
import ResultStudentView from "@/views/ResultStudentView/ResultStudentView.vue";
import ResultTeacherView from "@/views/ResultTeacherView/ResultTeacherView.vue";
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
        path: '/logout',
        beforeEnter: (to, from, next) => {
            SecurityService.clearToken();
            next('/login');
        }
    },
    {
        path: '/add/test',
        name: 'AddTestView',
        component: AddTestView
    },
    {
        path: '/test/:id?',
        name: 'TestView',
        component: TestView,
        meta: {
            authorized: true
        }
    },
    {
        path: '/send/:id?',
        name: 'StudentLinkView',
        component: StudentLinkView,
        meta: {
            authorized: false
        }
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
        path: '/noValidTestLink',
        name: 'NoValidTestLinkView',
        component: NoValidTestLinkView,
        meta: {
            authorized: false
        }
    },
    {
        path: '/test/:code?',
        name: 'TestStudentView',
        component: TestStudentView,
        meta: {
            authorized: false
        }
    },
    {
        path: '/attempt/:code?',
        name: 'AttemptStudentView',
        component: AttemptStudentView,
        meta: {
            authorized: false
        }
    },
    {
        path: '/result/:code?',
        name: 'ResultStudentView',
        component: ResultStudentView,
        meta: {
            authorized: false
        }
    },
    {
        path: '/attempt/teacher/:id?',
        name: 'AttemptStudentView',
        component: AttemptTeacherView,
    },
    {
        path: '/result/teacher/:id?',
        name: 'ResultStudentView',
        component: ResultTeacherView,
        meta: {
            authorized: true
        }
    },
    {
        path: '/:userId?/:code?',
        name: 'ValidView',
        component: ValidView,
    },
    {
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
