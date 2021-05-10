<template>
	<router-view></router-view>
</template>
<script setup>
	import {computed,ref} from 'vue'
	import {useStore}  from 'vuex'
	import ws from './ws.js'
	import fetPost from './api.js'
	import {data,task} from './data.js'
	const store  = useStore();
	
	ws.onmessage = function(evt){
		var msg = JSON.parse(evt.data)
		console.log(msg)
		if(msg.type === "message") {
			store.commit("pushMessage",{message:msg.msg})
			store.commit("pushOtherMessage",{message:msg.msg})
		}
	}

		//定义绑定
	ws.bind = function(){
		var uid = localStorage.getItem("uid");
			if (!parseInt(uid )){
				console.log("未登录无法执行绑定")
				return false
			}
			var obj = {};
				obj.type = "bind";
				obj.FromId = parseInt(localStorage.getItem("uid"));
			ws.send(JSON.stringify(obj));
	}

	ws.onopen = function(evt){
			console.log(evt.data)
			//链接成功以后进行绑定
			ws.bind()
			task.is_connect = 1
	}
	ws.onclose = function(){
			console.log("链接关闭,15秒以后重连")
			task.is_connect = 0;
	}
	data.onChange = function(){
		store.commit("setConnect",{is_connect:data.is_connect})
		console.log("链接状态变化")
	}
	//先判断是否存在user_id
	var user_id = localStorage.getItem("uid");
	user_id = parseInt(user_id);
	if(user_id) {
		store.commit("setUserId",{user_id:user_id});
	}
	
	if(store.state.user_id != 0) {
		var formdata = new FormData();
			formdata.append("uid",user_id)
		fetPost("api/user/friends",formdata)
		.then(res=>{
			if (res.code == 200) {
				store.commit("setFriends",{friends:res.data})
			}
		})
		fetPost("api/user/info",formdata)
		.then(res=>{
			if (res.code == 200) {
				store.commit("setUserInfo",{userInfo:res.data})
			}
		})
	}
	
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>