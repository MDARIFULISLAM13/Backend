const input_model = require( "../models/Url" );

let input_new_url = async ( req, res ) =>
{
    let { user_url, user_name } = req.body;

    if ( !user_url )
    {
        return res.status( 400 ).json( {
            status: 0,
            message: "User URL is required",
        } );
    }

    try
    {
        if ( user_name )
        {
            const existing = await input_model.findOne( { given_name: user_name } );
            if ( existing )
            {
                return res.status( 409 ).json( {
                    status: 0,
                    message: "This custom name is already taken.",
                } );
            }
        }

        const userdata = {
            given_url: user_url,
            given_name: user_name,
        };

        const input_data = new input_model( userdata );
        await input_data.save();
        const shortUrl = `https://arif.com/${userdata.given_name}`;
        res.json( {
            status: 1,
            message: "✅ URL shortened successfully!",
            shortUrl: shortUrl,
        } );
    } catch ( err )
    {
        res.status( 500 ).json( {
            status: 0,
            message: "❌ Error while saving data: " + err.message,
        } );
    }
};



module.exports = input_new_url;
