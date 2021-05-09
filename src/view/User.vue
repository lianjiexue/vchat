<template>
	<div id="user">
		<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/logo.png" width="112" height="28"></router-link>
		     
		    </div>
		</nav>
		<div style="display: none"><input type="file" name="file" @change="change"/></div>
		<div style="display: flex;justify-content: center;">
    		<div style="border-radius: 150px;width: 150px;overflow: hidden;height: 150px;" @click="upload">
    			<img :src="user.head_img" style="width: 150px;height: 150px;">
    		</div>
    	</div>
		<div style="text-align: center;margin:20px;">{{user.nickname}}</div>
		<div style="text-align: center;margin:20px;">{{user.description}}</div>
		<div style="display: flex;justify-content: center;">
		<button class="button is-danger" @click="loginOut" style="margin:10px;">退出</button>
		</div>
	</div>
</template>
<script setup>
	import {onMounted,computed} from 'vue'
	import {useRouter} from 'vue-router'
	import {useStore} from 'vuex'
	import fetPost from '../api.js'
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
	const upload = ()=>{
		document.querySelector("input[name='file']").click()
	}
	const change = ()=>{
		var file = document.querySelector("input[name='file']")
		var formdata = new FormData();
			formdata.append("file",file.files[0]);
			formdata.append("uid",localStorage.getItem("uid"))
		fetPost("/api/user/upload",formdata).
		then(res=>{
				if(res.code == 200) {
					store.commit("setUserHeadImg",{head_img:res.data.head_img})
				}
		})
	}

</script>