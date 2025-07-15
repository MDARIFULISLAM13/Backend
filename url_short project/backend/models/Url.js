const mongoose = require( 'mongoose' );


const UrlSchema = new mongoose.Schema( {
    given_url: {
        type: String,
        required: true,
    },
    given_name: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
} );

const UrlModel = mongoose.model( "enquiry", UrlSchema );

module.exports = UrlModel;
