import * as http from 'http';
import * as debug from 'debug';
import * as fs from 'fs';
import * as https from 'https';

import App from './App';

debug('ts-express:server');

const port = process.env.PORT || 443; //Heroku
App.set('port', port);

/**
 * Uncomment when developing in local.
 * This deploys the server in the 443 port with SSL enabled using self-signed certificates
 */
/*var key = fs.readFileSync( 'ssl_certs/YOURPRIVATE.key' );
var cert = fs.readFileSync( 'ssl_certs/YOURPUBLIC.pem' );
var credentials = {
    key: key,
    cert: cert
};
const server = https.createServer( credentials, App );*/
///

/**
 * Uncomment when deploying to the development environment (e.g Heroku)
 */
const server = http.createServer(App);
server.listen(port);
////

server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
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

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  console.log('Server started on port ' + port);
}