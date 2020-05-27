const Joi = require('@hapi/joi'); //Validator
const commonValidators = require('./common-validators');


const registrationValidator = () => {
    const schema = Joi.object({
        first_name: commonValidators.personNameValidator(),
        middle_name: commonValidators.personNameValidator(),
        last_name: commonValidators.personNameValidator(),
        address:Joi.object().keys({
            country: commonValidators.mongoIdValidator(),
            city: commonValidators.mongoIdValidator(),
            street: commonValidators.streetValidator(),
            zip: commonValidators.zipValidator(),
        }).required(),
        email: commonValidators.emailFieldValidator(),
        password: commonValidators.passwordValidator(),
        position: commonValidators.mongoIdValidator(),
        department: commonValidators.mongoIdValidator(),
        role:commonValidators.personNameValidator()
    });
    return schema;
}

module.exports = registrationValidator;