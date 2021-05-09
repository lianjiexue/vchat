<template>
	<div id="user">
		<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/logo.png" width="112" height="28"></router-link>
		     
		    </div>
		</nav>
		<div style="display: flex;justify-content: center;">
    		<div style="border-radius: 150px;width: 150px;overflow: hidden;height: 150px;">
    			<img :src="user.head_img" style="width: 150px;height: 150px;">
    		</div>
    	</div>
		<div>{{user.nickname}}</div>
		<div>{{user.description}}</div>
		<button v-if="!is_follow" class="button is-primary" @click="follow" style="margin:10px;">关注</button>
		<button v-if="is_follow" class="button is-danger" @click="unfollow" style="margin:10px;">取消关注</button>
	</div>
</template>
<script setup>
	import {onMounted,computed,ref} from 'vue'
	import {useRoute} from 'vue-router'
	import {useStore} from 'vuex'
	import fetPost from '../api.js'

	const route = useRoute();

	const user = ref({});
	const is_follow = ref(0);
	onMounted(()=>{
		var formdata = new FormData();
		var fid = route.params.fid
		var uid = localStorage.getItem("uid")
		formdata.append("fid",fid)
		formdata.append("uid",uid)
		fetPost("/api/user/follow",formdata).
		then(res=>{
			if(res.code == 200) {
				user.value = res.data.user 
				is_follow.value = res.data.is_follow
			}
		})
	});
	const follow = ()=>{
		var formdata = new FormData();

		var fid = route.params.fid;
		var uid = localStorage.getItem("uid");

		formdata.append("uid",uid);
		formdata.append("fid",fid);
		fetPost("/api/friend/follow",formdata).
		then(res=>{
			if(res.code == 200) {
				is_follow.value = 1
			}
		})
	}
	const unfollow = ()=>{
		var formdata = new FormData();

		var fid = route.params.fid;
		var uid = localStorage.getItem("uid");

		formdata.append("uid",uid);
		formdata.append("fid",fid);
		fetPost("/api/friend/unfollow",formdata).
		then(res=>{
			if(res.code == 200) {
				is_follow.value = 0
			}
		})
	}
</script>