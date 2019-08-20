import VueRouter from 'vue-router'

import project from './components/project.vue'
import login from './components/login.vue'
import bar_project from './components/bar/project.vue'
import bar_api from './components/bar/api.vue'
import bar_add_project from './components/bar/add_project.vue'
import project_list from './components/project_list.vue'
import create_project from './components/form/create_project.vue'
import api from './components/api.vue'
import api_option from './components/api_option.vue'

// import api_prev from './components/form/api_prev.vue'
// import api_edit from './components/form/api_edit.vue'
// import create_api from './components/form/create_api.vue'

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/project' },
        // { path: '/', component: project },
        {
            path: '/project',
            component: project,
            children: [
                {
                    path: '/',
                    components: {
                        'bar_btns': bar_project,
                        'content': project_list
                    },
                },
                {
                    path: 'add',
                    components: {
                        'bar_btns': bar_add_project,
                        'content': create_project
                    }
                },
                {
                    path: ':project_id',
                    components: {
                        'bar_btns': bar_api,
                        'content': api
                    },
                    children: [
                        {
                            path: ':api_id'
                            // component: api_option
                        }
                    ]
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