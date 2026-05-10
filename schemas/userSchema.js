import joi from 'joi';

const loginSchema = joi.object({
  
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const registerSchema = joi.object({
  fullName: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
  phone: joi.string().pattern(/^09\d{8}$/).required(),
});

const userSchema = {
  login: loginSchema,
  register: registerSchema,
};


export default userSchema;