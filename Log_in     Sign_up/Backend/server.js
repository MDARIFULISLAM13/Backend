const express = require( 'express' );
const dotenv = require( 'dotenv' );
const connectDB = require( './config/db' );
const authRoutes = require( './routes/authRoutes' );
const cors = require( 'cors' );

dotenv.config();

const app = express();

connectDB();

app.use( cors() );
app.use( express.json() );

app.use( '/api/auth', authRoutes );

const PORT = process.env.PORT || 5000;

app.listen( PORT, () =>
{
    console.log( `Server running on port ${PORT}` );
} );
