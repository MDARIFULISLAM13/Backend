
let express = require( "express" );
const { dbconnection } = require( "./dbConnection" );


let app = express();

app.use( express.json() )

app.get( "/student-read", ( req, res ) =>
{
    res.send( "Student view api\n" )
} )
app.post( "/student-insert", async ( req, res ) =>
{
    let myDB = await dbconnection();
    let studentCollection = myDB.collection( "ALL_Students" )
    let { sname, semail } = req.body;
    let obj = { sname, semail };
    let insertres = await studentCollection.insertOne( obj );

    let resobj = {
        statusbar: 1,
        msg: "Data insert\n",
        insertres
    }
    res.send( resobj );
} )

app.listen( "8000" );

