const express = require( 'express' );
const nodemailer = require( 'nodemailer' );
require( 'dotenv' ).config();

const app = express();
app.use( express.json() );

app.post( '/send-otp', async ( req, res ) =>
{
    const { email } = req.body;
    const otp = Math.floor( 100000 + Math.random() * 900000 )+"arif";

    const transporter = nodemailer.createTransport( {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    } );

    const mailOptions = {
        from: `"OTP System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`,
    };

    try
    {
        await transporter.sendMail( mailOptions );
        res.status( 200 ).json( { message: 'OTP sent successfully!', otp } ); // send otp for testing only
    } catch ( error )
    {
        res.status( 500 ).json( { message: 'Failed to send email', error } );
    }
} );

const PORT = 3000;
app.listen( PORT, () => console.log( `Server running on http://localhost:${PORT}` ) );
