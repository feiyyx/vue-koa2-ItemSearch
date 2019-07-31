import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/index'
import AddItem from '../page/addItem'

Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/index',
        meta: {
          title: '首页'
        }
        
      }, {
        path: '/additem',
        name: 'AddItem',
        component: AddItem,
        meta: {
          title: '添加装备'
        } 
      },{
        path: '/index',
        name: 'Index',
        component: Index,
        meta: {
          title: '首页'
        }
      }
    ]
})

export default router;