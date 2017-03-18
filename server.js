var connect = require('connect');
var serveStatic = require('serve-static');
var serverApp = connect();
var serverPort = 888;

serverApp.use(serveStatic("."))

serverApp.listen(serverPort, function() {
    console.log('Server running on ' + serverPort + '...');
});
