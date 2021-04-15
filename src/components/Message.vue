<template>
	<div class="card">
	  <div class="card-content">
	    <div class="media">
	      <div class="media-left">
	        <figure class="image is-48x48">
	          <img :src="mood.user.head" alt="Placeholder image">
	        </figure>
	      </div>
	      <div class="media-content">
	        <p class="title is-4">{{mood.user.username}}</p>
	        <p class="subtitle is-6">{{mood.user.title}}</p>
	      </div>
	    </div>

	    <div class="content">
	    	<span>
	    	{{mood.data.content}}
	    	</span>
	    	<br>
	    	<div style="text-align: right;">
	    		<time datetime="2016-1-1" > {{mood.data.datetime}}</time>
	    	</div>
	      
	    </div>
	  </div>
	   <footer class="card-footer">
	   	<router-link :to="/chat/ + mood.user.uid " class="card-footer-item">回复</router-link>
	   	<a href="javascript:void(0)" class="card-footer-item" @click="report">举报</a>
	   	<a href="javascript:void(0)" class="card-footer-item" @click="">屏蔽</a>
	  </footer>
	</div>
</template>
<script>
	export default {
		props:{
			mood:Object
		},
		setup(){

		},
		methods:{
			chat(){
				console.log("跳转")
				this.$router.push("/chat")
			},
		}
	}
</script>