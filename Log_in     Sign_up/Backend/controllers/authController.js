const User = require( '../models/User' );
const jwt = require( 'jsonwebtoken' );
const nodemailer = require( 'nodemailer' );
const express = require( 'express' );
require( 'dotenv' ).config();



sendOTP = async ( email, otp ) =>
{
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

    console.log( otp );


    return transporter.sendMail( mailOptions );
};



exports.signup = async ( req, res ) =>
{
    const { username, email, password } = req.body;

    try
    {

        const userExists = await User.findOne( { $or: [{ username }, { email }] } );
        if ( userExists ) return res.status( 400 ).json( { message: 'Username or Email already exists' } );



        let base = Math.floor( 100000 + Math.random() * 900000 ).toString();
        let seconds = new Date().getSeconds().toString();

        let otp = ( base + seconds ).slice( 0, 6 ); // Mix them, but take only 6 digits
        otp.toString();

        const user = new User( {
            username,
            email,
            password,
            isVerified: false,//false
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000 // 10 mins
        } );

        //console.log( otp );

        await user.save();

        await sendOTP( email, otp );

        res.status( 200 ).json( { userId: user._id } );


    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { message: 'Server error' } );
    }
};

exports.verifyOtp = async ( req, res ) =>
{
    try
    {
        const { userId, otp } = req.body;
        const user = await User.findById( userId );
        if ( !user ) return res.status( 400 ).json( { message: 'User not found' } );
        if ( user.isVerified ) return res.status( 400 ).json( { message: 'User already verified' } );

        if ( user.otp !== otp ) return res.status( 400 ).json( { message: 'Invalid OTP' } );
        if ( user.otpExpires < Date.now() ) return res.status( 400 ).json( { message: 'OTP expired' } );

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.json( { message: 'Email verified successfully! You can now login.' } );
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { message: 'Server error' } );
    }
};

exports.login = async ( req, res ) =>
{
    const { username, password } = req.body;

    try
    {
        const user = await User.findOne( { username } );
        if ( !user ) return res.status( 401 ).json( { message: 'Invalid credentials' } );
        if ( !user.isVerified ) return res.status( 401 ).json( { message: 'Please verify your email first' } );
        if ( user.password !== password ) return res.status( 401 ).json( { message: 'Invalid credentials' } );

        const token = jwt.sign( { id: user._id, username }, process.env.JWT_SECRET, { expiresIn: '1h' } );

        res.json( { token } );
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { message: 'Server error' } );
    }
};











