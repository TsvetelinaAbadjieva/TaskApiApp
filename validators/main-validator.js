const Joi = require('@hapi/joi');//Validator

const validateRequest = (schema)=> async (req,res,next)=>{
    console.log('in validator',req.body)

    const {error} = await schema.validate(req.body);
    console.log('error',error)

    if(error){
        console.log('error')
         res.status(400).send(error);
        throw new Error(error);
    }
    return next();
}
module.exports = validateRequest;