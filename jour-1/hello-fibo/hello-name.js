var http = require('http');
var randomName = require('./random/name');

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
    
    response.write('bonjour ' + randomName());
    response.end()

}).listen(8888);

console.log('Server started');