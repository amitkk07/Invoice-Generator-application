const mongoose = require( "mongoose" )
const Users = mongoose.model( "users" );
const jwt = require( "jsonwebtoken" );
const JWT_SECRATE_KEY = "Amit@12345"
// auth cheack

const auth = async ( req, res, next ) => {
    let token = req.header( "Authorization" )
    if ( token ) {
        token = token.replace( "Bearer ", "" )
        const decoded = jwt.verify( token,JWT_SECRATE_KEY )
        const user = await Users.findOne( {
            _id: decoded.uid,
        } );

        if ( !user ) {
            res.status( 401 ).send( { error: "authentication failed" } )
        } else {
            req.token = token;
            req.uid = user._id
            next();
        }
    } else {
        res.status( 401 ).send( { error: "authentication failed" } )
    }
};

module.exports = auth
