let express = require( 'express' );
const { enquiryIsert, EnquireList, DeleteEnquire, UpdateEnquiry } = require( '../../controllers/web/userEnquiryController' );

let Enquiry_Routes = express.Router();
//insert data in DB
Enquiry_Routes.post( '/enqiry-insert', enquiryIsert )
//view data form DB
Enquiry_Routes.get( '/enqiry-list', EnquireList )
//delete data from DB
Enquiry_Routes.delete( "/enquiry-dalete/:id", DeleteEnquire )
//updates data
Enquiry_Routes.put( "/enquiry-update/:id", UpdateEnquiry )

module.exports = Enquiry_Routes;