const { User, Product } = require( "../models/user_res" );


exports.sign_up = async ( req, res ) =>
{

    const { name, password } = req.body;
    try
    {


        const user = new User( {
            name,
            password,

        } )
        await user.save();
        res.send( {
            status: 1,
            msg: "User Created done",
            userid: user._id,
        })
    }
    catch ( err )
    {
        res.send( {
            msg: "server Error",
            data : err,
        })
    }
}