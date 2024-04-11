const express = require( "express" );
const app = express();
const http = require( 'http' );
const server = http.createServer( app );
const bodyParser = require( "body-parser" )
app.use( bodyParser.json( { limit: '20mb', extended: true } ) )
app.use( bodyParser.urlencoded( { limit: '20mb', extended: true } ) )
global.srcDirPath = __dirname + '/src';
require( srcDirPath )( app, server );
const PORT = 3000
server.listen( PORT, function () {
    console.log( `Server is running on port- ${PORT }` );
} )