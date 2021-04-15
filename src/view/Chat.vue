<template>
	<div class="messages">
		<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/bulma-logo.png" width="112" height="28"></router-link>
		     
		    </div>
		</nav>
		<div v-for="message in state.messages">
			<div class="msg-datetime" style="text-align: center;"> {{message.datetime}}</div>
			<template v-if="message.to_id == state.to_id">
				<div class="msg-content" style="text-align: right;"> {{message.content}}</div>
			</template>
			<template v-else>
				<div class="msg-content" style="text-align: left
				;"> {{message.content}}</div>
			</template>
		</div>
	</div>
	<div class="chat">
		<textarea class="v-textarea" v-model="state.content"></textarea>
		<button class="button is-primary" @click="send"> 发送</button>
	</div>
	<div class="send" ></div>
</template>
<script setup>
	import {ref,onMounted,reactive} from 'vue'
	import fetPost from '../api.js'
	import {useRoute} from 'vue-router'
	const state = reactive({messages:[],to_id:null,content:'',userInfo:null,toInfo:null})
	const route = useRoute();
	onMounted(()=>{
		state.to_id = route.params.uid;
		// 获取个人信息
		var formdata = new FormData();
			formdata.append("uid",state.to_id)
		fetPost("/api/getUserByUid",formdata)
		.then(res=>{
			state.toInfo = res.data.user
		})
		//获取聊天对象的信息
	})
	const getDateTime = () =>{
		var date = new Date()
		return date.getFullYear()+'.'+date.getMonth()+'.' + date.getDay();
	}
	const send = ()=>{
		var msg = {}
			msg.message_id = null;
			msg.from_id = localStorage.getItem('uid')
			msg.to_id   = state.to_id;
			msg.content = state.content;
			msg.datetime = getDateTime()
			state.messages.push(msg)
		console.log(state.messages)
			state.content = ''
	}
</script>
<style type="text/css">
	.chat{
		position: fixed;
		bottom: 0px;
		width:80%;
		display: flex;
		justify-content: start;
	}
	.messages{
		padding:10px;
	}
</style>