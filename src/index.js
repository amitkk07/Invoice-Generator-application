module.exports = function ( app, server ) {
    //db config
    require( "./dbconfig" )
    //import all models
    require( "./model" );
    //import all routes
    require( './routes' )( app );
}
