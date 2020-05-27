const Joi = require('@hapi/joi'); //Validator

const loginValidator = () => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).email(),
        password: Joi.string().min(8).max(255).required(),
    });
    return schema;
}

module.exports = loginValidator;