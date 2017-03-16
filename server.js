var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();
var serverPort = 888;

app.use(serveStatic("."))

app.listen(serverPort, function() {
    console.log('Server running on ' + serverPort + '...');
});