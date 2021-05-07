<template>

	<div id="messages">
	<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/bulma-logo.png" width="112" height="28"></router-link>
		     
		    </div>
	</nav>
	<div v-for="(message,key) in messages"  style="margin:10px;" :key="key">
		<div class="notification is-success">
		  	<button class="delete" @click="removemsg(key,message)"></button>
		  		<div class="head"></div>
		  	<div class="msg" @click="talk(message)">{{message.content}}</div>
		</div>
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
	const user_id = store.state.user_id;

	const messages = computed(()=>{
		var msgs = new Array()
			console.log("消息读入")
			store.state.othermessages.map((value,key)=>{
					msgs.push(value)
			})
		console.log(msgs)
		return msgs;
	})
	const removemsg = (key) =>{
		store.commit("removeMessage",key)
	}
	const talk = (msg)=>{
		router.push("/chat/"+msg.from_id)
	}
</script>