<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/logo.png" width="112" height="28"></router-link>
		     
		    </div>
	</nav>
	<div class="moods">
		<div class="mood-item" v-for="(item,key) in state.moods" :key="key">
			<div class="mood-content" v-html="item.content"></div>
			<div class="mood-time">{{item.datetime}}</div>
		</div>
	</div>
</template>
<script setup>
	import { onMounted,computed,reactive} from 'vue'
	import { useStore } from 'vuex'
	import fetPost from '../api.js'
	const  state = reactive({moods:[],page:1,end:true})

	window.onscroll= function(){
        //文档内容实际高度（包括超出视窗的溢出部分）
        var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        //滚动条滚动距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //窗口可视范围高度
        var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
        
        if(clientHeight + scrollTop >= scrollHeight){
        	if (state.end) {
        		return ;
        	}
           state.page += 1;
           getMoods();
        }

    }

	onMounted(()=>{
		const uid = localStorage.getItem("uid")
		const formdata = new FormData();
			  formdata.append("uid",uid);
			  formdata.append("page",state.page);

		fetPost("/api/mood/list",formdata)
		.then(res=>{
			console.log(res)
			if(res.code == 200) {
				state.moods = res.data
				if (res.data.length == 10) {
					state.end = false
				}
			}
		})
	})
	const getMoods = ()=>{
		const uid = localStorage.getItem("uid")
		const formdata = new FormData();
			  formdata.append("uid",uid)
			  formdata.append("page",state.page)

		fetPost("/api/mood/list",formdata).
		then(res=>{
			if(res.code == 200) {
				console.log(state)
				if (!res.data) {
					state.end = true
				} else {
					console.log(res.data)
					state.moods = state.moods.concat(res.data)
				}
				
			}
		})
	}
</script>