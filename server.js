
const http = require("http")
const fs  = require("fs")
const url = require ("url")
const path = require("path")
const mimeTypes = {
	"html" : "text/html",
	"jpg" : "image/jpeg",
	"jpeg" : "image/jpg",
	"png" : "image/png",
	"webp" : "image/webp",
	"js" : "text/javascript",
	"json" : "application/json",
	"css" : "text/css"
}
	
	http.createServer((request,response) => {
		let pathname = url.parse(request.url).pathname
		let filename = "";
		if(pathname ==='/'){
		filename = "./index.html";
		}else filename = path.join(process.cwd(),pathname)
		
		try{
			fs.accessSync(filename, fs.F_OK)
			let fileStream = fs.createReadStream(filename)
			mimeType = mimeTypes[path.extname(filename).split('.')[1]]
			response.writeHeader(200, {"content-type": mimeType})
			fileStream.pipe(response)
			
		}catch(e){
			console.log("file does not exist: " + filename)
				response.writeHeader(404, {"content-type": "text/plain"})
				response.write("Not Found\n")
				response.end()
				return		
			
		}
		return
				
		
 }).listen(process.env.PORT || 5000)


/*


const http = require("http")
const fs  = require("fs")
const PORT = 8080;

fs.readFile("./index.html", function(err,html){
	
	if(err) throw err;
	
	http.createServer(function (request,response){
		response.writeHeader(200, {"content-type": "text/html"})
		response.write(html)
		response.end()		
}).listen(PORT)
})



*/