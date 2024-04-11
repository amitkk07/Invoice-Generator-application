const mongoose = require( "mongoose" );
const Product = mongoose.model( "products" );
const puppeteer = require( 'puppeteer' );


module.exports = {
    addProduct: async function ( req, res ) {
        var data = req.body.data;
        var uid=req.uid
        console.log( req.uid,"req.user.uid")
        const post = new Product();
            post.name = data.name;
            post.qty= data.qty
            post.rate = data.rate
            post.uid=uid
            await post.save();
            res.send( {
                status: 200,
                message: "Product Added Successfully",
                result: post,
            } );
       
    },
    generateInvoice: async function ( req, res ) {
        try {
            var uid=req.uid
            let data = await Product.find( {
                uid:uid
            } );
            console.log(data,"data")



            if ( !data ) {
                return res.status( 404 ).send( "Product not found" );
            }

            // Generate PDF
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await Promise.all( data.map( async items => {
                await page.setContent( `
            <h1>Invoice</h1>
            <p>Name: ${ items.name }</p>
            <p>Quantity: ${ items.qty }</p>
            <p>Rate: ${ items.rate }</p>
            <p>Total: ${items.qty * items.rate }</p>
                            `);
            }))

           
        
            // Generate PDF
            let inc = Math.floor( Math.random() * 999999 ) + 100000;
            let pdfUrl = await page.pdf( { path:`invoiceDocument/invoice${inc}.pdf`, format: 'A4' } );
            await browser.close();

            res.send( {
                success:1,
                message: "Invoice generated successfully",
                path: `invoiceDocument/invoice${ inc }.pdf`
            } );
        } catch ( error ) {
            console.error( "Error generating invoice:", error );
            res.status( 500 ).send( "Internal Server Error" );
        }
    }

}