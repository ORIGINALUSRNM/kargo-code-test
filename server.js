var express = require('express');
var path = require('path');
var request = require('request');
var app = express();

app.use(express.static('src'));
app.use(express.static('node_modules'));

app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname + '/src/index.html'));

});

var server = app.listen(3000, function () {

	var port = server.address().port;
	console.log('kargo-code-test express server listening on port %s', port);

});