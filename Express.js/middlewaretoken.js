let mytoken = "1234";

let check_token = ( req, res, next ) =>
{
    if ( req.query.token == "" || req.query.token == undefined )
    {
        return res.send( {
            status: 0,
            msg: "PLZ FILL the token.."
        } )
    }
    if ( req.query.token != mytoken )
    {
        return res.send( {
            status: 0,
            msg: "PLZ FILL the correct token.."
        } )

    }
    next();
}

module.exports={check_token}