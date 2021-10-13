import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/home'),
    children: [
      {
        path: '/',
        name: 'find',
        component: () => import('../views/find')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/my')
      },
      {
        path: '/cloud',
        name: 'cloud',
        component: () => import('../views/cloud')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/video')
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index-2.vue')
  },
  {
    path: '/listView',
    name: 'listView',
    component: () => import('../views/listView')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
