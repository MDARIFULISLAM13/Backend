
let express = require( "express" );
const { dbconnection } = require( "./dbConnection" );
const { ObjectId } = require( "mongodb" );


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


//data insert in db
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


//data delete from db
app.delete( "/student-delete/:id",async ( req, res ) =>
{
    let { id } = req.params;
    let myDB = await dbconnection();
    let studentCollection = myDB.collection( "ALL_Students" )
    let delres = await studentCollection.deleteOne( { _id: new ObjectId( id ) } )
    let resobj = {
        statusbar: 1,
        msg: "Data delete\n",
        delres
    };

    res.send( resobj );

} )

//update data from db
app.put( "/student-update/:id",async ( req, res ) =>
{
    let { id } = req.params;
    let { sname, semail } = req.body;
    let obj = { sname, semail };
    let myDB = await dbconnection();
    let studentCollection = myDB.collection( "ALL_Students" )
    let updateres=await studentCollection.updateOne({_id:new ObjectId(id)},{$set:{sname,semail}})
    let resobj = {
        statusbar: 1,
        msg: "data update\n",
        updateres
    };

    res.send( resobj );


})


app.listen( "8000" );

