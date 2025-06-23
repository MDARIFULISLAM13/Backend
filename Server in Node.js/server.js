let http = require( "http" )

let server = http.createServer( (req,res) =>
{
    if ( req.url == "/Arif" )
    {
        res.end( "Welcome To Arif\n" );
    }
    res.end( "Welcome to server\n" );
} )
server.listen("1000") //http://localhost:1000