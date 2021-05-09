import { createRouter, createWebHistory,createWebHashHistory} from 'vue-router'
import Home from '../view/Home.vue'
import Login from '../view/Login.vue'
import Register from '../view/Register.vue'
import Chat from '../view/Chat.vue'
import User from '../view/User.vue'
import UserFriend from '../view/UserFriend.vue'
import Friend from '../view/Friend.vue'
import Messages from '../view/Messages.vue'
import OneUser from '../view/OneUser.vue'
import Moods from '../view/Moods.vue'
// route.js
const routes = [
  { path: '/', component: Home ,name:"Home"},
  { path: '/login', component: Login ,name:"Login"},
  { path: '/chat' , component: Chat,name:"Chat"},
  { path: '/chat/:uid' , component: Chat,name:"Chat"},
  { path: '/user' , component: User,name:"User"},
  { path: '/friends' , component: Friend, name:"Friend"},
  { path: '/messages' , component: Messages, name:"Messages"},
  { path: '/Register', component:Register,name:"Register"},
  { path: '/user/info/:uid', component:UserFriend,name:"UserFriend"},
  { path: '/oneuser/:fid', component:OneUser,name:"OneUser"},
   { path: '/moods/', component:Moods,name:"Moods"},
]
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})
router.beforeEach((to,from,next)=>{
  // console.log("跳转了")
  if (to.name !== "Home" && to.name !== "Login" && to.name !== "Register") {
      var uid = localStorage.getItem("uid")
      if(!uid) {
        next({name:"Login"})
      } else {
        next()
      }
  } else {
    next()
  }
})
export default router