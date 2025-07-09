
let express = require( "express" );
const { dbconnection } = require( "./dbConnection" );


let app = express();

app.use( express.json() )

//view data;
app.get( "/student-read", async ( req, res ) =>
{
    let myDB = await dbconnection();
    let studentCollection = myDB.collection( "ALL_Students" )

    let data = await studentCollection.find().toArray();
    let resobj = {
        statusbar: 1,
        msg: "Student List\n",
        data
    }
    res.send( resobj );

} )


//data insert in bd
app.post( "/student-insert", async ( req, res ) =>
{
    let myDB = await dbconnection();
    let studentCollection = myDB.collection( "ALL_Students" );

    let { sname, semail } = req.body;
    let obj = { sname, semail };

    // Check if email already exists
    let existingStudent = await studentCollection.findOne( { semail } );
    if ( existingStudent )
    {
        return res.send( "Email already found\n" );
    }

    // Insert if email not found
    let insertres = await studentCollection.insertOne( obj );
    let resobj = {
        statusbar: 1,
        msg: "Data inserted\n",
        insertres
    };

    res.send( resobj );
} );


app.listen( "8000" );

