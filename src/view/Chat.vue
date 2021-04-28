<template>
	<div class="messages">
		<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/bulma-logo.png" width="112" height="28"></router-link>
		     <b style="margin-top:15px;">{{state.toInfo.nickname}}</b>
		    </div>
		</nav>
		<div v-for="message in messages">
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
	import {ref,onMounted,reactive,computed} from 'vue'
	import fetPost from '../api.js'
	import {useRoute} from 'vue-router'
	import {useStore}  from 'vuex'

	const state = reactive({to_id:null,content:'',userInfo:{},toInfo:{}})
	const store = useStore();
	
	const messages = computed(()=>{
			var msgs = new Array()
			console.log("消息读入")
			store.state.messages.map((value,key)=>{
				msgs.push(value)
			})
			return msgs;
	});
	const route = useRoute();
	onMounted(()=>{
		console.log("执行获取用户");
		state.to_id = route.params.uid;
		// 获取个人信息
		var formdata = new FormData();
			formdata.append("uid",state.to_id)
		fetPost("/api/user/info",formdata)
		.then(res=>{
			console.log(res.data)
			if(res.code == 200) {
				state.toInfo = res.data
			}
		})
		//获取聊天对象的信息
		//这里展示的消息应该是我的消息，但是
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
			store.commit("pushMessage",{message:msg})
			// 通过http发送到服务器
		var formdata = new FormData();
			formdata.append("from_id",msg.from_id)
			formdata.append("to_id",msg.to_id)
			formdata.append("content",msg.content)
			fetPost("api/message/new",formdata)
			.then(res=>{
				console.log(res)
			})
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