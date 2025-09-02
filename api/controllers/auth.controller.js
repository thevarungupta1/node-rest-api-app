const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Post: register a user
// encrypt the password
exports.register = async (req, res) => {
    const {username, password, email} = req.body;

    // verify if email and password are not empty
    if(!username || !password || !email){
        return res.status(400).json({
            error: true,
            message: 'username, password and email are required'
        })
    }
    // verify no user exist with same email
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            error: true,
            message: 'User already exists'
        })
    }
    // encrypt the password
    const salt = await bcrypt.genSalt(Number(10))
    const hashedPassword = await bcrypt.hash(password, salt)

    // create new user with hashed password
    const newUser = new User({
        ...req.body,        
        password: hashedPassword
    })

    await newUser.save()
    // return the response
    res.status(201).json({
        error: false,
        message: 'User registered successfully'
    })
}





// Post: login a user
// verify if the email and password are not empty
// find user by email
// verify user exists
// compare the password
// create a token
// send the token in the response
exports.login = async(req, res) => {
    const {email, password} = req.body;
    // verify if email and password are not empty
    if(!email || !password){
        return res.status(400).json({
            error: true,
            message: 'email and password are required'
        })
    }

    // find user by email
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            error: true,
            message: 'User not found'
        })
    }
    
    // verify if user exists
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
        return res.status(400).json({
            error: true,
            message: 'Invalid password'
        })
    }

    // create a token
    const payload = {email, username: user.username};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    // send the token in the response
    res.status(200).json({
        error: false,
        message: 'User logged in successfully',
        token
    })
}