<template>
	<div class="login">
		 <div class="navbar-brand">
      <router-link to="/" class="navbar-item"> <img src="../assets/logo.png" width="112" height="28"></router-link>
    </div>
		<form class="box">
		  <div class="field">
		    <label class="label">邮箱</label>
		    <div class="control">
		      <input class="input" type="email" placeholder="输入邮箱" v-model="state.email">
		    </div>
		  </div>

		  <div class="field">
		    <label class="label">密码</label>
		    <div class="control">
		      <input class="input" type="password" placeholder="请输入密码" v-model="state.password">
		    </div>
		  </div>

		  <span class="button is-primary" @click="login">登录</span>
		   <router-link to="/register" class="button is-primary" style="margin-left:.75rem"> 注册</router-link>
		</form>
	</div>
	
</template>

<script setup>
	import { reactive } from 'vue'
	import fetPost from '../api.js'
	import { useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	const state = reactive({email:'',password:''})
	const router = useRouter();
	const store = useStore();

    const login = () => {
    	
    	var formdata = new FormData();
    		formdata.append("email",state.email)
    		formdata.append("password",state.password)
    	fetPost("/api/login",formdata)
    	.then((res)=>{
    		if(res.code == 200) {
    			localStorage.setItem("uid",res.data.user.id)
    			store.commit("setFriends",res.data.friends)
    			router.push("/")
    			
    		}
    	})
    	.catch((error)=>{
    		console.log(error)
    	})
    }
</script>