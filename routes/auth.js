const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi'); //Validator
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

/**Models */
const User = require('../models/User');
const Department = require('../models/Department');
const Country = require('../models/Country');
const City = require('../models/City');
const Position = require('../models/Position');

/**Validators */
const registrationValidator = require('../validators/register-validation');
const registerSchema = registrationValidator();
const loginValidator = require('../validators/login-validation');
const loginSchema = loginValidator();
const validateRequest = require('../validators/main-validator');
const commonValidator = require('../validators/common-validators');
const emailValidatorInstance = commonValidator.emailValidator();
const cleanRequestQuery = require('../common/utils');

const checkExistingEmail = async (email) => {
    const existingUserEmail = await User.findOne({
        email: email
    }).exec()
    return existingUserEmail;
}
const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
}
const verifyToken = (req, res, next) => {
    let bearer = req.headers["authorization"];
    if (typeof bearer !== 'undefined') {
        let token = bearer.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_KEY, (err, token) => {
            if (err) {
                return res.status(403).send(err);
            }
            console.log('token', token)
            next();
        });
    } else {
        res.status(403).send('Access forbidden')
    }
}

router.get('/unique', verifyToken, async (req, res, next) => {
    console.log(req.query)
    let existingEmail = await checkExistingEmail(req.query.email)
    if (existingEmail) {
        return res.status(200).send([existingEmail])
    }
    res.status(200).send([]);
    next();
})
router.post('/register', validateRequest(registerSchema), async (req, res, next) => {
    console.log('register', req.body)
    //CHECK FOR EXISTING USER
    let existingEmail = await checkExistingEmail(req.body.email)
    if (existingEmail) {
        console.log('existing email', req.body.email)
        let error = new Error("Email already exists");
        return res.status(400).send(error)
    }
    //ENCRYPT PASSWORD
    const encryptedPassword = await encryptPassword(req.body.password);

    //CREATE NEW USER
    console.log('here', req.body.department)
    try {
        // const department = await Department.findOne({
        //     name: req.body.department
        // }).exec();
        // const country = await Country.findOne({
        //     name: req.body.address.country
        // }).exec();
        // const city = await City.findOne({
        //     name: req.body.address.city
        // }).exec();
        // const position = await Position.findOne({
        //     name: req.body.position
        // }).exec();

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            address: {
                country: req.body.address.country,
                city: req.body.address.city,
                phone: req.body.address.phone,
                street: req.body.address.street
            },
            email: req.body.email,
            password: encryptedPassword,
            position: req.body.position,
            department: req.body.department,
            role:req.body.role
        })
        const savedUser = await user.save();
        res.send(savedUser);

    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
    next()
})

router.post('/login', validateRequest(loginSchema), async (req, res, next) => {
    //CHECK EXISTING USER WITH THIS EMAIL
    let user = await User.findOne({
            email: req.body.email
        })
        .populate('department')
        .populate('position')
        .exec()
    console.log('user', user)
    if (!user) {
        return res.status(401).send('Not existing user')
    }
    //CHECK PASSWORD
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).send('Invalid password')
    }
    const token = jwt.sign({
        _id: user._id,
        role: user.role
    }, process.env.TOKEN_KEY);
    console.log(token)
    res.header('Authorization', 'Bearer ' + token).status(200).send(user);
    next();
})

//get User by email
router.get("/", validateRequest(emailValidatorInstance), async (req, res, next) => {
    const user = await User.findOne({
            email: req.body.email
        })
        .populate('department')
        .exec()
    if (!user) {
        res.status(404).send({
            message: 'Object not found'
        });
    }
    res.send(user)
    next();
})


module.exports = router;