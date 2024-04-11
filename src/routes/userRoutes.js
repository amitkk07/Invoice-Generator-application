const router = require( "express" ).Router()
const userCtrl = require( '../controller/userCtrl' )
// const auth = require( "../middleware/authUser" )

 router.post( "/login", userCtrl.userLogin )
 router.post( "/register", userCtrl.userRegister )



module.exports = router