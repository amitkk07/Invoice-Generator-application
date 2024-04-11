const router = require( "express" ).Router()
const productCtrl = require( '../controller/productCtrl' )
const auth = require( "../middleware/authUser" )

router.post( "/add", auth, productCtrl.addProduct )
router.get( "/get/data", auth, productCtrl.generateInvoice )
module.exports = router