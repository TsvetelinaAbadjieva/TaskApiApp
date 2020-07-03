const User = require('../models/User');
const router = require('express').Router();
const editUserValidator = require('../validators/register-validation');
const editUserSchema = editUserValidator();
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
                "middle_name": 1,
                "last_name": 1,
                "address": 1,
                "email": 1,
                "role": 1,
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
        let find = cleanRequestQuery(req) || '';
        console.log(find.query)

        if (req.query.for_filter) {
            const users = await User.find({
                    $or: [{
                            first_name: new RegExp(find.query)
                        },
                        {
                            middle_name: new RegExp(find.query)
                        },
                        {
                            last_name: new RegExp(find.query)
                        }
                    ]
                })
                .select({
                    '_id': 1,
                    'first_name': 1,
                    'last_name': 1
                })
                .limit(20)
                .exec();
            mappedUsers = users.map(user => ({
                _id: user._id,
                name: user.first_name + ' ' + user.last_name
            }));
            if (users) {
                return res.status(200).send(mappedUsers)
            }
        } else {
            const users = await User.find()
                .select({
                    'first_name': 1,
                    'middle_name': 1,
                    'last_name': 1,
                    'address': 1,
                    'role': 1,
                    'is_blocked': 1,
                    'zip': 1
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

        }

    } catch (error) {
        res.status(404).send(error)
    }
    next();
})
router.patch('/:_id', validateRequest(editUserSchema), async (req, res, next) => {
    let data = {
        ...req.body
    };
    try {
        const user = await User.findOneAndUpdate({
            _id: req.params._id
        }, data).exec();
        console.log(user)
        res.status(200).send(user)
    } catch (error) {
        res.status(403).send(error)
    }
    next();
})



module.exports = router;