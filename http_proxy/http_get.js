/**
 * Created by JetBrains WebStorm.
 * User: kailu
 * Date: 12-4-10
 * Time: 下午9:43
 * To change this template use File | Settings | File Templates.
 */
function start(){
var http=require('http');
var options = {
  host: 'www.nodebeginner.org',
  port: 80,
  path: '',
  headers:{'accept-charset':'utf-8'}
};

http.get(options, function(res) {
  //console.log(res);
	var data
	console.log(res.headers)
	res.on('data',function(q){
				console.log(q);
				console.log('*************get data')
				data+=q;
			});
	res.on('end',function(q){
				console.log('body end');
				//console.log(data);
			});
}).on('error', function(e) {
  console.log("Got error: " + e.message);
})

}

start();