import { createRouter, createWebHistory,createWebHashHistory} from 'vue-router'
import Home from '../view/Home.vue'
import Login from '../view/Login.vue'
import Chat from '../view/Chat.vue'
import User from '../view/User.vue'
import Friend from '../view/Friend.vue'
import Messages from '../view/Messages.vue'
// route.js
const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/chat' , component: Chat},
  { path: '/chat/:uid' , component: Chat},
  { path: '/user' , component: User},
  { path: '/friends' , component: Friend},
  { path: '/messages' , component: Messages},
]
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})
export default router