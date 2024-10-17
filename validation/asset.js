const Joi = require('@hapi/joi');

exports.ADD_ASSET = Joi.object({
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().required(),
    assetType: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().min(5).required(),
    userId: Joi.number().required()
})