

const express = require( 'express' );

const dotenv = require( 'dotenv' );
const ConnectDB = require( './config/db' );
const url_routh = require( './routers/routh' );
dotenv.config();

const app = express();
app.use( express.json() );
ConnectDB();

app.use( '/api/arif', url_routh);

const port = process.env.PORT;
app.listen( port, () =>
{
    console.log( `app is running using port ${port}` );
} );

