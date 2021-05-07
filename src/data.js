const data = {
	is_connect:0,
	onChange(){

	}
}
const task = new Proxy(data,{
		get(obj,prop){
			console.log("获取")
		},
		set(obj,prop,value){
			obj[prop] = value
	 		if(prop === "is_connect") {
				data.onChange()
			}
			return true
		}
	})
export {data,task}