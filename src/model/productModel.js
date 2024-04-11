const mongoose = require( "mongoose" );

const prepSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
}, {
    timestamps: true
} )

module.exports = mongoose.model( "products", prepSchema )