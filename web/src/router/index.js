import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import About from '../views/About.vue'
import UserList from '../views/User/OpenIdList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [      
      {        
        path: 'userlist',
        component: UserList
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
