import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import About from '../views/About.vue'
import OpenIdList from '../views/User/OpenIdList.vue'
import UserList from '../views/User/UserList.vue'
import UserEdit from '../views/User/UserEdit.vue'
import MessageCreate from '../views/Message/MessageCreate.vue'
import MessageList from '../views/Message/MessageList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/main",
    name: "main",
    component: Main,
    children: [
      {
        path: '/OpenId/list',
        component: OpenIdList
      },
      {
        path: '/User/list',
        component: UserList
      },
      {
        path: '/User/Edit/:id',
        component: UserEdit,
        props: true
      },
      {
        path: '/Message/create',
        component: MessageCreate
      },
      {
        path: '/Message/list',
        component: MessageList
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: 'about',
        component: About
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
