const mongoose = require( "mongoose" );
require( "dotenv" ).config();
mongoose.Promise = global.Promise;
var mongodbErrorHandler = require( "mongoose-mongodb-errors" );
const MONGOURI ="mongodb+srv://amit:lQSfG159wr6X8e5U@cluster0.02xhuay.mongodb.net/"
mongoose.plugin( mongodbErrorHandler );
mongoose.connect(MONGOURI, {
        dbName: "Invoice_assignment",
    } )
    .then( () => console.log( "Mongo DB connected!" ) )
    .catch( ( err ) => console.log( err ) );