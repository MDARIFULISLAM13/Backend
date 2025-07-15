let express = require( 'express' );
let mongoose = require( 'mongoose' );
const user_routes = require( './routes/urlRoutes' );
require( 'dotenv' ).config();

let app = express();
app.use( express.json() );

const cors = require( 'cors' );
app.use( cors() );

app.use( "/api/web", user_routes );



const UrlModel = require( './models/Url' );
app.get( '/:shortCode', async ( req, res ) =>
{
    const shortCode = req.params.shortCode;

    try
    {
        const data = await UrlModel.findOne( { given_name: shortCode } );
        if ( data )
        {
            return res.redirect( data.given_url );
        } else
        {
            return res.status( 404 ).send( "🔍 Short URL not found" );
        }
    } catch ( err )
    {
        console.error( "Redirect Error:", err );
        return res.status( 500 ).send( "❌ Server error" );
    }
} );



mongoose.connect( process.env.DBURL ).then( () =>
{
    console.log( "✅ Connected to database\n" );
    app.listen( process.env.PORT, () =>
    {
        console.log( "🚀 Server is running at port " + process.env.PORT );
    } );
} ).catch( ( err ) =>
{
    console.error( "❌ DB Connection Failed:\n", err );
} );
