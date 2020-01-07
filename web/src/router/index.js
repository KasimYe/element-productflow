import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import About from '../views/About.vue'
import OpenIdList from '../views/User/OpenIdList.vue'
import UserList from '../views/User/UserList.vue'
import MessageCreate from '../views/Message/MessageCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
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
        path: '/Message/create',
        component: MessageCreate
      },
      {        
        path: 'home',
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
