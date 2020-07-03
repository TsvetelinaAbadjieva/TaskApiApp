const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

projectValidator = () => {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        description: Joi.string().required(),
        start_date: Joi.date().utc().format(['YYYY-MM-DD', 'YYYY/MM/DD', 'DD-MM-YYYY', 'MM-DD-YYYY', 'MM/DD/YYYY']).required(),
        end_date: Joi.date().utc().format(['YYYY-MM-DD', 'YYYY/MM/DD', 'DD-MM-YYYY', 'MM-DD-YYYY', 'MM/DD/YYYY']).required(),
        responsible_persons: Joi.array().items(Joi.string()).min(1).required(),
        documents: Joi.array().items(Joi.object().keys({
            file: Joi.string()
        })).optional()
    })
    return schema
}
module.exports = projectValidator;