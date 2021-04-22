<template>
	<div id="home">
			<Nav />
			<Message :mood="state.mood"/>
			<!-- 获取下一条消息 -->

			<button class="button is-danger" style="margin-top:120px" @click="next">下一条</button>

			<!-- 消息弹窗 -->
			<div class="modal" style="display: block" v-if="state.show">
			  <div class="modal-background"></div>
			  <div class="modal-content" style="margin:0px;padding:20px;">
			    <p class="image is-4by3">
			      <textarea class="textarea"  placeholder="输入内容" v-model="state.content"></textarea>
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
import { defineProps, reactive, onMounted } from 'vue'
import {useStore} from 'vuex'
import fetPost from '../api.js'

onMounted(()=>{
	console.log("程序初始化完成，调用消息服务器")
	var uid = localStorage.getItem("uid")
	state.user_id = uid;
	var data = new FormData();
		data.append("uid",uid)
	//获取一条别人发的心情消息
	fetPost("/api/mood/one",data)
	.then(res=>{
		console.log(res)
	})
})
const showModal = ()=>{
	state.show = true
}
const closeModal = ()=>{
	state.show = false
}
const send = ()=>{
	console.log("发表心情")
	var formdata = new FormData();
		formdata.append("uid",state.user_id)
		formdata.append("content", state.content)
		fetPost("/api/mood/add",formdata)
		.then(res=>{
			console.log(res)
		})
	state.show = false
}
const next = ()=>{

}
function login(){
	console.log("我已经登录过了")
}
const state = reactive({ user_id: 0 ,show:false,content:"",mood:{
			user:{
				username:"风清扬",
				head:"https://bulma.io/images/placeholders/96x96.png",
				title:"见过就好",
				uid:1
			},
			data:{
				content:"北国风光千里雪飘，望长城内外唯余茫茫\
				大河上下顿失涛涛",
				datetime:"2021.4.14 08:10:24",
				id:1,
			}
		}})
const store = useStore()
</script>

<style scoped>
a {
  color: #42b983;
}
</style>