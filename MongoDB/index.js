
let express = require( "express" )

let app = express();

app.use( express.json() )

app.get( "/student-read", ( req, res ) =>
{
    res.send("Student view api\n")
} )
app.post( "/student-insert", ( req, res ) =>
{
    res.send("Student insert api\n")
} )

app.listen( "8000" );