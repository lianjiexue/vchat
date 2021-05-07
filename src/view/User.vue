<template>
	<div id="user">
		<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/bulma-logo.png" width="112" height="28"></router-link>
		     
		    </div>
		</nav>
		<div style="display: flex;justify-content: center;">
    		<div style="border-radius: 150px;width: 150px;overflow: hidden;height: 150px;">
    			<img :src="user.head_img" style="width: 150px;height: 150px;">
    		</div>
    	</div>
		<div>{{user.nickname}}</div>
		<div>{{user.description}}</div>
		<button class="button is-danger" @click="loginOut" style="margin:10px;">退出</button>
	</div>
</template>
<script setup>
	import {onMounted,computed} from 'vue'
	import {useRouter} from 'vue-router'
	import {useStore} from 'vuex'
	const router = useRouter();
	const store  = useStore();
	
	const user = computed(()=>{
		return  store.state.userInfo;
	})
	console.log(user)
	const loginOut = ()=>{
		localStorage.setItem("uid",'')
		router.push("/")
	}
</script>