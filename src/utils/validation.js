const Joi = require("joi");

const addSchoolSchema = Joi.object({
  name: Joi.string().min(1).required(),
  address: Joi.string().min(1).required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
}); 

const listSchoolsSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
});

module.exports = { addSchoolSchema, listSchoolsSchema };

