var ws = new WebSocket("ws://127.0.0.1:8081/ws");

	ws.onclose = function(){
		console.log("链接关闭")
	}

	ws.onopen = function(evt){
		console.log(evt.data)
		//链接成功以后进行绑定
		bind()
	}

	ws.onmessage = function(evt){
		// var res = JSON.parse(evt.data)

		if(res.type == "message") {
			// console.log(store)
			//当收到的是消息的时候
			// store.commit("pushMessage",{message:res.msg})
		} else {
			console.log("消息为")
			console.log(evt.data)
		}
		
	}
		
	function bind(){
		var obj = {};
			obj.type = "bind";
			obj.FromId = parseInt(localStorage.getItem("uid"));
		ws.send(JSON.stringify(obj));
	}
	export default ws;