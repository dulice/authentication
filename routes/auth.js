const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    //Validate the date before a user use
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    

    //Check if the user is already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //HASH the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        console.log(err.message);
    }
})

//Login the user
router.post('/login', async (req, res) => {

    //validation the date before login
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //if donesn't not exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exist');

    //password checking
    const validPassword = await bcrypt.compare( req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Password');

    //create and assign a token
    const token = jwt.sign({ _id: user._id}, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);
})

module.exports = router;