<template>
	<div class="register">
		 <div class="navbar-brand">
      <router-link to="/" class="navbar-item"> <img src="../assets/logo.png" width="112" height="28"></router-link>
    </div>
		<div class="box" onsubmit="return false">
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
		  <div class="field">
		    <label class="label">验证</label>
		    <div class="control">
		      <input class="input" type="verify" placeholder="朝辞白帝彩云间" v-model="state.verify">
		    </div>
		  </div>
		   <span class="button is-primary" @click="sure">确定</span>
		</div>

	</div>
	
</template>

<script setup>
	import {reactive } from 'vue'
	import fetPost from '../api.js'
	import {useRouter} from 'vue-router'

	const state = reactive({email:'',password:'',verify:''})
	const router = useRouter();

    const sure = () => {
    
    	var formdata = new FormData();
    		formdata.append("email",state.email)
    		formdata.append("password",state.password)
    		formdata.append("verify",state.verify)
    	fetPost("/api/register",formdata)
    	.then((res)=>{
    		if (res.code == 200) {
    			localStorage.setItem("uid",res.data.uid)
    			router.push("/")
    		}
    		
    	})
    	.catch((error)=>{
    		console.log(error)
    	})
    }
</script>