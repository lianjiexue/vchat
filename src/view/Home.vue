<template>
	<div id="home">
			<Nav />
			
				<Message :mood="mood" v-if="mood"/>
				<div v-if="!mood"><div class="notification">&nbsp;暂时无心情,您可以发表心情让他人看到,且只能被一个人看到</div></div>
			<!-- 获取下一条消息 -->

			<button class="button is-danger" style="margin-top:120px;margin-left:130px;" @click="next">刷新</button>

			<!-- 消息弹窗 -->
			<div class="modal" style="display: block" v-if="state.show">
			  <div class="modal-background" @click="onClose()"></div>
			  <div class="modal-content" style="margin:0px;padding:20px;">
			    <p class=" is-5by3">
			      <div class="textarea"  placeholder="输入内容" contenteditable></div>
			    </p>
			    <p style="margin:10px;">
			    	<button class="button is-primary" @click="send()">确定</button>
			    </p>
			  </div>
			  <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
			</div>

		 <span @click="showModal" class="write"><img src="../assets/comment.png"></span> 
		</div>

</template>

<script setup>

import Login from './Login.vue'
import Message from '../components/Message.vue'
import Nav from '../components/Nav.vue'
import Footer from './Footer.vue'
import { defineProps, reactive, onMounted ,computed} from 'vue'
import {useStore} from 'vuex'
import fetPost from '../api.js'

const store = useStore();
onMounted(()=>{
	getOneMood()
	
})
const mood = computed(()=>{

	return store.state.mood;
})
const onClose = ()=>{
	state.show = false
}
const getOneMood = ()=>{
	var uid = localStorage.getItem("uid")
	state.user_id = uid;
	var data = new FormData();
		data.append("uid",uid)
	//获取一条别人发的心情消息
	fetPost("/api/mood/one",data)
	.then(res=>{
		// console.log(res)
		if(res.code == 200) {
			store.commit("oneMood",{mood:res.data})
		}
	})
}
const showModal = ()=>{
	state.show = true
}
const closeModal = ()=>{
	state.show = false
}
const send = ()=>{
	var content = document.querySelector(".textarea").innerHTML
	if(!state.user_id) {
		return
	}
	var formdata = new FormData();
		formdata.append("uid",state.user_id)
		formdata.append("content", content)
		fetPost("/api/mood/add",formdata)
		.then(res=>{
			if (res.code == 200) {
				document.querySelector(".textarea").innerHTML = ""
			}
		})
	state.show = false
}
const next = ()=>{
	getOneMood()
}
function login(){
	console.log("我已经登录过了")
}
const state = reactive({ user_id: 0 ,show:false,content:""})
</script>

<style scoped>
a {
  color: #42b983;
}
</style>