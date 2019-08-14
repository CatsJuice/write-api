// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

// 使用路由
Vue.use(VueRouter);
// 导入 抽离的 router.js
import router from './router.js'

// 导入根组件 app
import app from './app.vue';


// 样式文件
import 'bootstrap/dist/css/bootstrap.min.css'
// import './css/public.css'

const vm = new Vue({
    el: "#app",
    render: c => c(app),
    router  // 挂在路由对象
})