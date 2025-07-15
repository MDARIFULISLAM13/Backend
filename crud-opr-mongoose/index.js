let express = require( 'express' );
var mongooes = require( 'mongoose' );
const Enquiry_Routes = require( './App/routes/web/enquiryroutes' );
require( 'dotenv' ).config();



let app = express();
app.use( express.json() );

app.use("/api/web/enquiry",Enquiry_Routes)


mongooes.connect( process.env.DBURL ).then( () =>
{
    console.log( "Connected to database\n" );
    app.listen( process.env.PORT, () =>
    {
        console.log( "Server is running at port " + process.env.PORT );
    } )
} )