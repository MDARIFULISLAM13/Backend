const enquiryModel = require( "../../models/enquiry.model" );

let enquiryIsert = ( req, res ) =>
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

}

let EnquireList = async ( req, res ) =>
{


    let enquiryList = await enquiryModel.find();
    res.send( {
        status: 1,
        msg: "Enquiry List -- \n",
        data: enquiryList

    } )


}
let DeleteEnquire = async ( req, res ) =>
{
    let enquiryId = req.params.id;
    let deleteenquiry = await enquiryModel.deleteOne( { _id: enquiryId } );
    res.send( {
        status: 1,
        msg: "Enquiry Delete",
        id: enquiryId,
        delres: deleteenquiry
    } )
}
let UpdateEnquiry = async ( req, res ) =>
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
        data: updateRes
    } )


}
module.exports = { enquiryIsert,EnquireList,DeleteEnquire,UpdateEnquiry};