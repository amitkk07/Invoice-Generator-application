const mongoose = require( "mongoose" );
const Users = mongoose.model( "users" );
const bcrypt = require( "bcrypt" )
const jwt = require( 'jsonwebtoken' );
const JWT_SECRATE_KEY="Amit@12345"
module.exports = {
    userRegister: async function ( req, res ) {
        var data = req.body.data;
        console.log(data,"data")
            var is_email_exist = await Users.findOne( {
                    user_email: data.user_email.toLowerCase(),
                } )
            if ( is_email_exist) {
                res.send( {
                    success: 0,
                    message: "Email already exist",
                } );
            } else {
                const post = new Users();
                post.user_name = data.user_name;
                post.user_email = data.user_email.toLowerCase();
                post.user_password = await bcrypt.hash( data.user_password, 8 )
                await post.save();
                res.send( {
                    status: 200,
                    message: "User Added Successfully",
                    result: post,
                } );
            }
    },

    userLogin: async function ( req, res ) {
        var user_email = req.body.data.user_email
        var user_password = req.body.data.user_password
        if ( user_email && user_password ) {
            const results = await Users.findOne( {
                user_email: user_email,
            } )
            const isMatch = await bcrypt.compare( user_password, results.user_password );
            if ( results && isMatch ) {
                   const token = jwt.sign( {
                    uid: results._id,
                    user_password: results.user_password
                },JWT_SECRATE_KEY )
                res.send( {
                    success: 1,
                    message: "Login Successfully",
                    userName: results.user_name,
                    Token: token
                } )

            } else {
                res.send( {
                    success: 0,
                    message: "Email or password not match"
                } )
            }
        } else {
            res.send( {
                success: 0,
                message: "Plz enter your credentials"
            } )
        }
    },
}