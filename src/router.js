import VueRouter from 'vue-router'

import project from './components/project.vue'
import login from './components/login.vue'

const router = new VueRouter({
    routes: [
        // { path: '/', redirect: '/home' },
        { path: '/', component: project },
        { path: '/project', component: project },
        { path: '/login', component: login },
        // { path: '/member', component: member },
        // { path: '/cart', component: cart },
        // { path: '/search', component: search },
    ],
    // linkActiveClass: 'mui-active'
})

export default router