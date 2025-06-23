let express = require( "express" );
let app = express();
app.use( express.json() );
app.get( "/", ( req, res ) =>
{
    //http://localhost:8000/
    res.send( { status: 1, msg: "Home api" } )
} )

app.get( "/arif", ( req, res ) =>
{
    //http://localhost:8000/arif
    res.send( { status: 1, msg: "arif api" } )
} )

app.post( "/login", ( req, res ) =>
{

    res.send( { status: 1,
        msg: "arif login api",
        body_data: req.body,
        querydata:req.query
    } )

} )
app.listen( "8000" );