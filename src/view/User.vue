<template>
	<div id="user">
		<nav class="navbar" role="navigation" aria-label="main navigation">
		    <div class="navbar-brand">
		      <router-link to="/" class="navbar-item"> <img src="../assets/bulma-logo.png" width="112" height="28"></router-link>
		     
		    </div>
		</nav>
		 <ul class="menu-list">
		    <li><a>修改头像</a></li>
		    <li><a>修改昵称</a></li>
		    <li><a>设置性别</a></li>
		    <li><a>个人介绍</a></li>
		    <li><a><button class="button is-danger" @click="loginOut">退出</button></a></li>
		  </ul>
	</div>
</template>
<script setup>
	const loginOut = ()=>{
		localStorage.setItem("uid",'')
	}
</script>