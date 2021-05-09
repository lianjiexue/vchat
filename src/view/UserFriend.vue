<template>
	<div id="user" style="padding: 10px;">
		<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/logo.png" width="112" height="28"></router-link>
		     
		    </div>
		</nav>
		<div>
			<div>
				<img :src="state.info.head_img">
			</div>
			<div>
				<span>{{state.info.nickname}}</span>
			</div>
			<div style="margin: 20px 0px;">{{state.info.description}}</div>
		</div>
	</div>
</template>
<script setup>
	import {onMounted,reactive} from 'vue'
	import {useRoute,useRouter} from 'vue-router'

	import fetPost from '../api.js'

	const route = useRoute();
	const router = useRouter();
	console.log(route)
	const state = reactive({info:{}})
	onMounted(()=>{
		var uid = route.params.uid;
		var formdata = new FormData();
			formdata.append("uid",uid)
		fetPost("/api/user/info",formdata)
		.then(res=>{
			console.log(res)
			if(res.code == 200) 
			{
				// console.log(res.data)
				state.info = res.data
			// 	user = res.data
			}
		})
	})	
	const loginOut = ()=>{
		localStorage.setItem("uid",'')
		router.push("/")
	}
</script>