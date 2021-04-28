<template>
 <router-view></router-view>
</template>
<script setup>

	import {useStore}  from 'vuex'
	import ws from './ws.js'

	const store  = useStore();
	ws.onmessage = function(evt){
		var msg = JSON.parse(evt.data)
		// console.log(evt.data)
		// console.log(msg)
		if(msg.type === "message") {
			console.log(msg)
			store.commit("pushMessage",{message:msg.msg})
		}
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