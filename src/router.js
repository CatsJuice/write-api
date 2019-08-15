import VueRouter from 'vue-router'

import project from './components/project.vue'
import login from './components/login.vue'
import bar_project from './components/bar/project.vue'
import bar_api from './components/bar/api.vue'
import bar_add_project from './components/bar/add_project.vue'
import project_list from './components/project_list.vue'
import create_project from './components/form/create_project.vue'

const router = new VueRouter({
    routes: [
        // { path: '/', redirect: '/home' },
        { path: '/', component: project },
        {
            path: '/project',
            component: project,
            children: [
                {
                    path: '/', 
                    components: {
                        'bar-btns': bar_project,
                        'content': project_list
                    },
                },
                {
                    path: 'add',
                    components: {
                        'bar-btns': bar_add_project,
                        'content': create_project
                    }
                },
                {
                    path: ':project_id',
                    components: {
                        'bar-btns': bar_api
                    }
                },
            ]
        },
        { path: '/login', component: login },
        // { path: '/member', component: member },
        // { path: '/cart', component: cart },
        // { path: '/search', component: search },
    ],
    // linkActiveClass: 'mui-active'
})

export default router