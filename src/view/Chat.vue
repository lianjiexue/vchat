<template>
	<div class="messages" style="margin-bottom: 50px;"> 
		<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <svg t="1620194750200" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2021" width="32" height="32"><path d="M700.29866667 942.54933333c-5.48266667 0-10.976-2.10133333-15.136-6.304l-405.86666667-408.90666666c-8.24533333-8.30933333-8.256-21.71733333-0.02133333-30.03733334l405.86666666-409.96266666c8.288-8.37333333 21.792-8.43733333 30.16533334-0.14933334 8.37333333 8.288 8.43733333 21.792 0.14933333 30.16533334L324.46933333 512.29866667l390.96533334 393.888c8.29866667 8.36266667 8.24533333 21.86666667-0.10666667 30.16533333-4.16 4.13866667-9.58933333 6.19733333-15.02933333 6.19733333z" p-id="2022" fill="#8a8a8a"></path></svg></router-link>
		     <b style="margin-top:15px;margin-left:35%">{{state.toInfo.nickname}}</b>
		    </div>
		</nav>
		<div v-for="message in messages" class="msg-item">
			<div class="msg-datetime" style="text-align: center;"> {{message.datetime}}</div>
			<div class="msg-content">
				<template v-if="message.from_id == state.uid">
				<div style="display: flex;justify-content: flex-end;align-items: center;" >  
					<div class="msgcontent" style="background-color: rgb(0, 196, 167);"><span style="color:#fff">{{message.content}}</span></div>
					<div class="msguserhead" style="min-width:45px">
						<img :src="userInfo.head_img" style="width:50px;">
					</div>
				</div>
			</template>
			<template v-else>
				<div style="display: flex;justify-content: flex-start;align-items: center;"> 
					<div class="msguserhead" style="min-width:45px">
						<img :src="state.toInfo.head_img" style="width:50px;">
					</div>
					<div class="msgcontent" style=" background: #eee;"><span >{{message.content}}</span></div>
				</div>
			</template>
			</div>
			
		</div>
	</div>
	<div class="chat">
		<textarea class="v-textarea" v-model="state.content" style="border:1px solid #ffdd57"  @keyup.enter="send" ></textarea>
		<button class="button is-primary" @click="send"> 发送</button>
	</div>
	<div class="send" ></div>
</template>
<script setup>
	import {ref,onMounted,reactive,computed} from 'vue'
	import fetPost from '../api.js'
	import {useRoute} from 'vue-router'
	import {useStore}  from 'vuex'

	const state = reactive({to_id:null,uid:null,content:'',toInfo:{}})
	const store = useStore();
	
	const messages = computed(()=>{
			var msgs = new Array()
			console.log("消息读入")
			store.state.messages.map((value,key)=>{

				if(value.to_id ==state.to_id && value.from_id == state.uid){
					msgs.push(value)
				}
				if(value.to_id ==state.uid && value.from_id == state.to_id){
					msgs.push(value)
				}
			})
			return msgs;
	});
	const route = useRoute();
	onMounted(()=>{
		
		console.log("执行获取用户");
		state.to_id = route.params.uid;
		state.uid   = localStorage.getItem('uid')
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
	const userInfo = computed(()=>{
		 return store.state.userInfo;
	});
	const getDateTime = () =>{
		var date = new Date()
		return date.getFullYear()+'.'+(date.getMonth()+1)+'.' + date.getDate();
	}
	const send = ()=>{

		var msg = {}
			msg.message_id = null;
			msg.from_id = localStorage.getItem('uid')
			msg.to_id   = state.to_id;
			msg.content = state.content;
			msg.datetime = getDateTime()
			if(msg.to_id == msg.from_id) {
				
				return
			}
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