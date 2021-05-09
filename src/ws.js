import {data,task} from './data.js'
var wsUrl = "ws://chat.daguozhensi.com/ws";
// var wsUrl = "ws://127.0.0.1:8008/ws" 
var ws = new WebSocket(wsUrl);

//定义重连
const reconnect = function(){
	console.log("重新链接")
	ws = new WebSocket(wsUrl);
	task.is_connect = 1;
}

setInterval(function(){
	console.log(data);
	if (data.is_connect == 0) {
		reconnect();
	} else {
		console.log(ws)
		var obj = {};
			obj.type = "pong"
			ws.send(JSON.stringify(obj))
	}

},1000*45);
export default ws;