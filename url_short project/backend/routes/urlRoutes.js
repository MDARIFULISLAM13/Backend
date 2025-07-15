const express = require( 'express' );
const input_new_url = require( '../controllers/urlController' );

const user_routes = express.Router();

user_routes.post( '/user_url', input_new_url );

module.exports = user_routes;
