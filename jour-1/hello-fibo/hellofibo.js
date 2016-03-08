var http = require('http');

var fibo = require("async-fibo");



var hellofibo = function (random){
	if (random >= 2){
		return hellofibo(random-1) + hellofibo(random-2);
	} else if (random === 1) {
		return 1;
	} else {
		return 0;
	}
}

var count = 0;
http.createServer(function (request, response) {
	count++;
	var currentUserCount= count;
	console.log('starting dealing with '+currentUserCount);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    var vStart = Date.now();
    var number = Math.ceil(Math.random() * 5 + 40);
    
    // solution synchrone
    //var fibonumber = hellofibo(number);
    //var vEnd = Date.now();
    //console.log('we are done with %s it took %s', currentUserCount, vEnd-vStart);
    //response.write(fibonumber.toString());
    //response.end();


    // solution asynchrone
    fibo(number, function(val){
		var vEnd = Date.now();
	    console.log('we are done with %s it took %s', currentUserCount, vEnd-vStart);
	    response.write(val.toString());
	    response.end();
    });
    

}).listen(8888);

console.log('Server started');
