<template>
	<div class="card">
	  <div class="card-content">
	    <div class="media">
	      <div class="media-left">
	        <figure class="image is-48x48">
	         <a @click="gooneuser(mood)" href="javascript:void(0)"> <img :src="mood.user.head_img" alt="Placeholder image"></a>
	        </figure>
	      </div>
	      <div class="media-content">
	        <p class="title is-6" style="padding-top:10px;">{{mood.user.nickname}}</p>
	        <p class="subtitle is-6">{{mood.user.title}}</p>
	      </div>
	    </div>

	    <div class="content">
	    	<div v-html="mood.mood.content">
	    	</div>
	    	<br>
	    	<div style="text-align: right;">
	    		<time datetime="2016-1-1" > {{mood.mood.datetime}}</time>
	    	</div>
	      
	    </div>
	  </div>
	   <footer class="card-footer">
	   	<a href="javascript:void(0)" class="card-footer-item" @click="onChat(mood)">回复</a>
	   	<a href="javascript:void(0)" class="card-footer-item" @click="report">举报</a>
	  </footer>
	</div>
</template>
<script setup>
	import {defineProps} from 'vue'
	import {useRouter} from 'vue-router'
	const router = useRouter();
	defineProps({
		mood:{}
	})
	const gooneuser=(mood)=>{
		const uid = localStorage.getItem("uid")
		if(uid == mood.user.id) {
			return false
		}
		router.push("/oneuser/"+mood.user.id)
	}
	const onChat = (mood)=>{
		const uid = localStorage.getItem("uid")
		if(uid == mood.user.id) {
			return false
		}
		router.push("/chat/"+mood.user.id)
	}
</script>