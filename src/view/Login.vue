<template>
	<div class="login">
		 <div class="navbar-brand">
      <router-link to="/" class="navbar-item"> <img src="../assets/bulma-logo.png" width="112" height="28"></router-link>
    </div>
		<form class="box">
		  <div class="field">
		    <label class="label">Email</label>
		    <div class="control">
		      <input class="input" type="email" placeholder="输入邮箱" v-model="state.email">
		    </div>
		  </div>

		  <div class="field">
		    <label class="label">Password</label>
		    <div class="control">
		      <input class="input" type="password" placeholder="请输入密码" v-model="state.password">
		    </div>
		  </div>

		  <span class="button is-primary" @click="login">登录</span>
		</form>
	</div>
	
</template>

<script setup>
	import {reactive } from 'vue'
	import fetPost from '../api.js'
	import {useRouter} from 'vue-router'

	const state = reactive({email:'',password:''})
	const router = useRouter();

    const login = () => {
    	console.log(state)
    	// console.log(router)
    	router.push("/")
    	localStorage.setItem("uid",1)
    	var formdata = new FormData();
    		formdata.append("email",state.email)
    		formdata.append("password",state.password)
    	fetPost("/login",formdata)
    	.then((res)=>{
    		console.log(res)
    	})
    	.catch((error)=>{
    		console.log(error)
    	})
    }
</script>