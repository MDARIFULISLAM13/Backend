
const express = require( 'express' );
const { sign_up } = require( "../controllers/controlling" );

const router = express.Router();

router.post( '/signup', sign_up );

module.exports = router;
