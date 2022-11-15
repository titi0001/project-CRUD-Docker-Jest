const Joi = require('joi').extend(require('@joi/date'));

  const checkToken = Joi.object({
    token: Joi.string().alphanum().length(16).required(),
  }).messages({
  'any.required': 'Token não encontrado',
  'string.base': 'Token inválido',
  'string.length': 'Token inválido',
  });

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const { error } = checkToken.validate(authorization);

  if (error !== undefined) {
    return res.status(401).send({ message: error.details[0].message });
 } 
  next();
};

const checkUserEmail = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).required().messages({
  'any.required': 'O campo {#label} é obrigatório',
  'string.email': 'O {#label} deve ter o formato "email@email.com"',
  'string.min': 'O {#label} deve ter pelo menos {#limit} caracteres',
});

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = checkUserEmail.validate({ email, password });
  if (error !== undefined) {
    return res.status(400).send({ message: error.details[0].message });
  }
   next();
};

  const checkUser = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().strict().integer().min(18)
    .required(),
    talk: Joi.object({
      watchedAt: Joi.date().format('DD/MM/YYYY').raw().required(),
      rate: Joi.number().min(1).max(5).required(),
    }), 
  }).required().messages({
    'any.required': 'O campo {#label} é obrigatório',
    'string.min': 'O {#label} deve ter pelo menos {#limit} caracteres',
    'number.min': 'A pessoa palestrante deve ser maior de idade',
    'date.format': 'O {#label} deve ter o formato {#format}',
    'number.max': 'O campo {#label} deve ser um inteiro 1 a 5',
  });

const validateCreateUser = async (req, res, next) => {
  const { name, age, talk, watchedAt, rate } = req.body;
  const { error } = checkUser.validate({ name, age, talk, watchedAt, rate });

  if (error !== undefined) {
     return res.status(401).send({ message: error.details[0].message });
  } 
  next();
};

module.exports = { 
  validateUser,
  validateCreateUser,
  validateToken,
 };