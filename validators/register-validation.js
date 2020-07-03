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
            phone: commonValidators.phoneValidator(),
        }).required(),
        email: commonValidators.emailFieldValidator(),
        password: commonValidators.passwordValidator(),
        position: commonValidators.mongoIdValidator(),
        department: commonValidators.mongoIdValidator(),
        role:commonValidators.personNameValidator()
    });
    return schema;
}

const editUserValidator = () => {
    const schema = Joi.object({
        first_name: commonValidators.personEditNameValidator(),
        middle_name: commonValidators.personEditNameValidator(),
        last_name: commonValidators.personEditNameValidator(),
        address:Joi.object().keys({
            country: commonValidators.mongoIdValidator(),
            city: commonValidators.mongoIdValidator(),
            street: commonValidators.streetEditValidator(),
            phone: commonValidators.phoneEditValidator(),
        }),
        email: commonValidators.emailEditFieldValidator(),
        password: commonValidators.passwordEditValidator(),
        position: commonValidators.mongoIdValidator(),
        department: commonValidators.mongoIdValidator(),
        role:commonValidators.personEditNameValidator()
    });
    return schema;
}

module.exports = registrationValidator;
module.exports = editUserValidator;