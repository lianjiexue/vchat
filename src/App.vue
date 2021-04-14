<template>

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item"> <img src="./assets/bulma-logo.png" width="112" height="28"></router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="showSider">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
</nav>
<Sider v-if="state.showSider"/>
 <router-view></router-view>
  
</template>

<script setup>
  import Login from './view/Login.vue'
  import {ref,reactive,onMounted} from 'vue'
  import Sider from './components/Sider.vue'
  import {useStore}  from 'vuex'

  const store = useStore();
  const state = reactive({state:{user_id:0,showSider:false}})

  onMounted(()=>{
     var user_id = localStorage.getItem("user_id")
     store.commit("login",{user_id:user_id})
     
  })
  const showSider = ()=>{
    if(state.showSider) {
      state.showSider =  false
    } else {
      state.showSider = true
    }
   
  }
 
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>