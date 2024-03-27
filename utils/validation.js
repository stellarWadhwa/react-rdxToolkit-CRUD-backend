const Joi=require("joi");

 const userRegisterValidation = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().required()
})

const userLoginValidation = Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().required()
})
const userCreationValidation = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    creatorEmail:Joi.string().required(),
    password:Joi.string().required()

})


module.exports = {userRegisterValidation,userLoginValidation,userCreationValidation}
