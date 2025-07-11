let express = require( 'express' );
var mongooes = require( 'mongoose' );
let enquiryModel = require( './App/models/enquiry.model' );
require( 'dotenv' ).config();


let app = express();
app.use( express.json() );


//insert data in DB
app.post( '/api/enqiry-insert', ( req, res ) =>
{

    let { sName, sEmail, sPhone, sMessage } = req.body;

    const userData = {
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    };

    let enquiry = new enquiryModel( userData );

    enquiry.save().then( () =>
    {
        res.send( { status: 1, message: "Data saved Successfully" } )
    } ).catch( ( err ) =>
    {
        res.send( { status: 0, message: "Error while saving data  " + err } );
    } )

} )

//view data form DB
app.get( '/api/enqiry-list', async ( req, res ) =>
{


    let enquiryList = await enquiryModel.find();
    res.send( {
        status: 1,
        msg: "Enquiry List -- \n",
        data: enquiryList

    } )


} )

//delete data from DB
app.delete( "/api/enquiry-dalete/:id", async ( req, res ) =>
{
    let enquiryId = req.params.id;
    let deleteenquiry = await enquiryModel.deleteOne( { _id: enquiryId } );
    res.send( {
        status: 1,
        msg: "Enquiry Delete",
        id: enquiryId,
        delres: deleteenquiry
    } )
} )

app.put( "/api/enquiry-update/:id",async ( req, res ) =>
{
    let enquiryId = req.params.id;

    let { sName, sEmail, sPhone, sMessage } = req.body;

    const userData = {
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    };
    let updateRes = await enquiryModel.updateOne( { _id: enquiryId }, userData )
    res.send( {
        status: 1,
        msg: "Update done",
        data:updateRes
    })


})

mongooes.connect( process.env.DBURL ).then( () =>
{
    console.log( "Connected to database\n" );
    app.listen( process.env.PORT, () =>
    {
        console.log( "Server is running at port " + process.env.PORT );
    } )
} )