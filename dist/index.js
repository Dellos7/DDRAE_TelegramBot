"use strict";
const http = require("http");
const debug = require("debug");
const fs = require("fs");
const https = require("https");
const App_1 = require("./App");
const PRODUCTION = false;
debug('ts-express:server');
const port = normalizePort(process.env.PORT || 443);
//var port = process.env.PORT || 443; //Heroku
App_1.default.set('port', port);
let server;
if (PRODUCTION) {
    server = http.createServer(App_1.default);
}
else {
    //Create the HTTPS credentials
    var key = fs.readFileSync('ssl_certs/YOURPRIVATE.key');
    var cert = fs.readFileSync('ssl_certs/YOURPUBLIC.pem');
    var credentials = {
        key: key,
        cert: cert
    };
    server = https.createServer(credentials, App_1.default);
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
    console.log('Server started on port ' + port);
}
