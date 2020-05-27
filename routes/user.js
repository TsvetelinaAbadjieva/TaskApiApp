const User = require('../models/User');
const router = require('express').Router();
const registrationValidator = require('../validators/register-validation');
const registerSchema = registrationValidator();
const loginValidator = require('../validators/login-validation');
const loginSchema = loginValidator();
const validateRequest = require('../validators/main-validator');
const commonValidator = require('../validators/common-validators');
const emailValidatorInstance = commonValidator.emailValidator();
const cleanRequestQuery = require('../common/utils');


router.get('/:_id', async (req, res, next) => {
    try {
        const user = await User.findById({
                _id: req.params._id
            })
            .populate('address.country')
            .populate('address.city')
            .populate('position')
            .populate('department')
            .select({
                "first_name": 1,
                "middle_name":1,
                "last_name":1,
                "address":1,
                "email":1,
                "role":1,
            }).exec();
        if (user) {
            return res.status(200).send(user)
        } else {
            return res.status(404).send('User not found')
        }

    } catch (error) {
        res.status(400).send(error)
    }
    next();
})
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find()
            .select({
                'first_name': 1,
                'middle_name': 1,
                'last_name': 1,
                'address':1,
                'role': 1,
                'is_blocked': 1,
                'zip':1
            })
            .populate('position')
            .populate('department')
            .populate('address.city')
            .populate('address.country')
            .sort({
                'first_name': 1
            })
            .limit(20)
            .exec();
        if (users) {
            return res.status(200).send(users)
        }

    } catch (error) {
        res.status(404).send(error)
    }
    next();
})



module.exports = router;