/**
 * Created by JetBrains WebStorm.
 * User: kailu
 * Date: 12-4-14
 * Time: 下午9:29
 * To change this template use File | Settings | File Templates.
 * Show server System info
 */
var http=require('http'),os=require('os');
http.createServer(function(request,response){
	var info='';
	info+='hostname:'+os.hostname();
	info+='\ntype:'+os.type();
	info+='\nrelease:'+os.release();
	info+='\nuptime:'+os.uptime()+'s';
	info+='\ntotalmem:'+(os.totalmem()/(1024*1024))+'MB';
	info+='\nfreemem:'+(os.freemem()/(1024*1024))+'MB';
	info+='\nfreemem(%):'+((os.freemem() / os.totalmem())*100)+'%';
	info+='\ncpuNum:'+os.cpus().length;
	if(os.cpus().length){
		info+='\ncputype:'+os.cpus()[0].model;
	}

	//console.log(info);
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write(info);
	response.end();
}).listen(8080);