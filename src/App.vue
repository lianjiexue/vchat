<template>

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item"> <img src="./assets/bulma-logo.png" width="112" height="28"></router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
</nav>
 <router-view></router-view>
  
</template>

<script setup>
  import Login from './view/Login.vue'
  import {ref,onMounted} from 'vue'
  import {useStore}  from 'vuex'
  const store = useStore();

  onMounted(()=>{
     var user_id = localStorage.getItem("user_id")
     store.commit("login",{user_id:user_id})
  })
  const state = ref({state:{user_id:0}})
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>