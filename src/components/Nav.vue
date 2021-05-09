<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item"> <img src="../assets/logo.png"></router-link>
      <a role="button" class="navbar-burger" :class="{is_connect_color:is_connect}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="showSider">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
</nav>
<Sider v-if="state.showSider" @click="hideSider"/>
</template>

<script setup>
  import {ref,reactive,onMounted,computed} from 'vue'
  import Sider from '../components/Sider.vue'
  import {useStore}  from 'vuex'

  const store = useStore();
  const state = reactive({state:{user_id:0,showSider:false}})
  const is_connect = computed(()=>{
    return store.state.is_connect
  })
  onMounted(()=>{
     var user_id = localStorage.getItem("user_id")
     store.commit("login",{user_id:user_id})
     
  })
  const hideSider = () => {
    state.showSider = false
  }
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
<style type="text/css">
  a.is_connect_color{
    color:#27d227;
  }
</style>