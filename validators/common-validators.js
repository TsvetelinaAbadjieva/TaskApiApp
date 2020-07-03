const Joi = require('@hapi/joi');

const emailValidator = () => {
    const schema = Joi.object({
        // email: Joi.string().min(6).max(255).email()
        email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    })
    return schema;
}

const personNameValidator = () => {
    return Joi.string().min(3).max(255).required().regex(/^[a-zA-Z]{3,30}$/)
}
const countryValidator = () => {
    return Joi.string().min(3).max(255).required().regex(/^[a-zA-Z]{2,30}$/)
}
const mongoIdValidator = () => {
    return Joi.string().min(3).max(255).required().regex(/^[a-zA-Z0-9]{2,30}$/)
}
const cityValidator = () => {
    return Joi.string().min(3).max(255).required().regex(/^(?:[A-Za-z0-9\.\-\,\'\"]+[ ]?)+$/)
}
const streetValidator = () => {
    return Joi.string().min(3).max(255).required().regex(/^\d+[ ](?:[A-Za-z0-9\.\-\,\'\"]+[ ]?)+$/)
}
const zipValidator = () => {
    return Joi.number()
    // return Joi.string().max(20).required().regex(/\b\d{5}(?:-\d{4})?\b/)
}
const phoneValidator = () => {
    return Joi.string().min(5).max(255).required().regex(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/)
}
const emailFieldValidator = () => {
    return Joi.string().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
}
const passwordValidator = () => {
   return  Joi.string().min(8).max(255).required()
}
const positionValidator = () => {
    return Joi.string().min(3).max(255).required().regex(/^[a-zA-Z]{3,30}$/)
}
const departmentValidator = () => {
    return Joi.string().min(3).max(255).required().regex(/^[a-zA-Z0-9]{3,30}$/)
}


const personEditNameValidator = () => {
    return Joi.string().min(3).max(255).regex(/^[a-zA-Z]{3,30}$/)
}
const countryEditValidator = () => {
    return Joi.string().min(3).max(255).regex(/^[a-zA-Z]{2,30}$/)
}
const cityEditValidator = () => {
    return Joi.string().min(3).max(255).regex(/^(?:[A-Za-z0-9\.\-\,\'\"]+[ ]?)+$/)
}
const streetEditValidator = () => {
    return Joi.string().min(3).max(255).regex(/^\d+[ ](?:[A-Za-z0-9\.\-\,\'\"]+[ ]?)+$/)
}
const phoneEditValidator = () => {
    return Joi.string().min(5).max(255).regex(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/)
}
const emailEditFieldValidator = () => {
    return Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
}
const passwordEditValidator = () => {
   return  Joi.string().min(8).max(255)
}
const positionEditValidator = () => {
    return Joi.string().min(3).max(255).regex(/^[a-zA-Z]{3,30}$/)
}
const departmentEditValidator = () => {
    return Joi.string().min(3).max(255).regex(/^[a-zA-Z0-9]{3,30}$/)
}

const commonValidators = {
    emailValidator: emailValidator,
    emailFieldValidator: emailFieldValidator,
    personNameValidator: personNameValidator,
    countryValidator: countryValidator,
    cityValidator: cityValidator,
    streetValidator: streetValidator,
    passwordValidator: passwordValidator,
    positionValidator: positionValidator,
    zipValidator: zipValidator,
    departmentValidator: departmentValidator,
    mongoIdValidator: mongoIdValidator,
    phoneValidator:phoneValidator,
    personEditNameValidator:personEditNameValidator,
    countryEditValidator:countryEditValidator,
    cityEditValidator:cityEditValidator,
    streetEditValidator:streetEditValidator,
    phoneEditValidator:phoneEditValidator,
    emailEditFieldValidator:emailEditFieldValidator,
    passwordEditValidator:passwordEditValidator,
    positionEditValidator:positionEditValidator,
    departmentEditValidator:departmentEditValidator
}
module.exports = commonValidators;