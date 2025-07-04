let express = require( "express" );
const { check_token } = require( "./middlewaretoken" );
let app = express();
app.use( express.json() );





app.get( "/", ( req, res ) =>
{
    //http://localhost:8000/
    res.send( { status: 1, msg: "Home api" } )
} )

app.get( "/arif", check_token, ( req, res ) =>
{
    //http://localhost:8000/arif
    res.send( { status: 1, msg: "arif api" } )
} )

app.post( "/login",( req, res ) =>
{

    res.send( {
        status: 1,
        msg: "arif login api",
        body_data: req.body,
        querydata: req.query
    } )

} )
app.listen( "8000" );