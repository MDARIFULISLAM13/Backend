
const mongo = require( 'mongoose' );

const user_reg = new mongo.Schema( {
    name: {
        type: String,
    },
    password: {
        type: String,
    }

} )

const product = new mongo.Schema( {
    product_name: {
        type: String,
        required: true,
        unique: true,
    },
    owner_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    }
} )

module.exports = {
    User: mongo.model( 'User_list', user_reg ),
    Product: mongo.model( 'item', product )
};