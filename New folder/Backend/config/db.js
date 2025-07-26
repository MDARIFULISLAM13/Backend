
const mongo = require( 'mongoose' );
const dotenv = require( 'dotenv' );
dotenv.config();


const ConnectDB = async () =>
{
    try
    {
        await mongo.connect( process.env.MONGO_URI );
        console.log( "DB connected Done\n" );
    }
    catch ( err )
    {
        console.log( err );
        process.exit( 1 );
    }
}
module.exports = ConnectDB;