/**
 * Created by JetBrains WebStorm.
 * User: kailu
 * Date: 12-4-10
 * Time: 下午9:11
 * To change this template use File | Settings | File Templates.
 */
var http = require("http");
var url = require("url");

http.createServer(function (req, res) {
	console.log("************* server request URL :"+req.url+" ************");
	console.log(req.headers);
   var urlToProxy =url.parse(req.url,true).query.u;
	console.log("request path :"+urlToProxy)
   if (!urlToProxy) {
       res.statusCode = 400;
       res.end("must have URL");

   }else if(url.parse(urlToProxy).pathname=='/debug'){
	    res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("server is run in 8080");
        res.end();
   }
   else {
       var parsedUrl = url.parse(urlToProxy);
       var opt = {
           host : parsedUrl.hostname,
           port : parsedUrl.port || 80,
           path : (parsedUrl.pathname || "") + (parsedUrl.search || "")
               + (parsedUrl.hash || ""),
	       headers:req.headers
       };
       http.get(opt, function(pres) {

	       if(pres.statusCode){
		                  res.statusCode = pres.statusCode;
		                  var headers = pres.headers;
		                  for (var key in headers) {
		                      res.setHeader(key, headers[key]);
		                  }
		       	       var data;
		                  pres.on("data", function(chunk) {
		       			   res.write(chunk);
		                      data+=chunk;
		                  });
		                  pres.on("end", function() {
		       	          // res.write(data);
		                      res.end();
		                  });
	       }else if(pres.statusCode==302){
		       console.log(pres.headers.location);
	       }

       }).on('error', function(e) {
         console.log("Got error: " + e.message);
       });
   }
}).listen(8080);

console.log("proxy server at run 8080");