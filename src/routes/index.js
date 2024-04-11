module.exports = function ( app ) {
    
    app.use( "/invoice/generator",
        require( "./userRoutes" )
    );
    app.use( "/invoice/generator/product",
        require( "./productRoutes" )
    );
}