<template>
	<div id="friends" style="padding:10px;">
	<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/bulma-logo.png" width="112" height="28"></router-link>
		     
		    </div>
	</nav>
	<ul class="menu-list" style="margin-top:10px">
		    <li v-for="friend in friends" style="display: flex;justify-content: flex-start;border-bottom: 1px solid #eee;padding-top:10px">
		    	<div class="head" @click="userinfo(friend)" style="width: 60px;border-radius: 10px;overflow: hidden;">
		    	<img :src="friend.head_img">
		    	</div>
		    	<div class="name" @click="chat(friend)" style="line-height: 50px;margin-left: 50px;">{{friend.nickname}}</div>
		    </li>
	</ul>
</div>
</template>
<script setup>

	import { onMounted,computed } from 'vue'
	import { useStore } from 'vuex'
	import { useRouter } from 'vue-router'

	const store = useStore();
	const router = useRouter();

	const friends = computed(()=>{
		console.log(store.state)
		return store.state.friends
	})
	const userinfo = (friend)=>{
		console.log(friend)
		router.push("/user/info/"+friend.id)
	}
	const chat = (friend)=>{
		// console.log(friend)
		router.push("/chat/"+friend.id)
	}
	console.log(friends.value)
</script>