const Joi = require('@hapi/joi');//Validator

const validateRequest = (schema)=> async (req,res,next)=>{
    const {error} = await schema.validate(req.body);

    if(error){
         res.status(400).send(error);
        throw new Error(error);
    }
    return next();
}
module.exports = validateRequest;