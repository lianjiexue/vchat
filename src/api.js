var baseUrl = "http://chat.daguozhensi.com"
// var baseUrl = "http://127.0.0.1:8008"
function fetPost(uri,body)
{
	var url = baseUrl+uri
	return new Promise((resolve,reject)=>{
		fetch(uri,{method:"post",body:body})
		.then(res=>{
			return res.json();
		})
		.then(res=>{
			resolve(res)
		}).catch(error=>{
			reject(error)
		})
	})
}
export default fetPost;