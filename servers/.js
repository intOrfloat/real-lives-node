var http = require("http");
var urlParser = require("url");

var server = http.createServer(function (req, res) {
	res.writeHead(200, {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json"
	});

}).listen(config.service.loadbalancer.port);