const { MongoClient } = require( 'mongodb' );

let dbconnectionurl = 'mongodb://127.0.0.1:27017';
const client = new MongoClient( dbconnectionurl ); // spelling fix

let dbconnection = async () =>
{
    await client.connect();
    let db = client.db( "mongodb_project_new_10_database" );
    return db;
};

module.exports = { dbconnection };
