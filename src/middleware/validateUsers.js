const Joi = require('joi').extend(require('@joi/date'));

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) { 
    return res.status(401).json({ message: 'Token não encontrado' }); 
  } if (authorization.length !== 16) { 
    return res.status(401).send({ message: 'Token inválido' }); 
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

  const checkUser = Joi.object().keys({
    name: Joi.string().min(3).required(),
    age: Joi.number().strict().integer().min(18)
    .required(),
    talk: Joi.object().keys({
      rate: Joi.number().strict().integer().min(1)
      .max(5)
      .required()
      .messages({ 
      'any.required': 'O campo "{#key}" é obrigatório',
      'number.min': 'O campo "{#key}" deve ser um inteiro de 1 à 5',
      'number.max': 'O campo "{#key}" deve ser um inteiro de 1 à 5',
     }),
      watchedAt: Joi.date().format('DD/MM/YYYY').raw().required()
      .messages({ 
      'any.required': 'O campo "{#key}" é obrigatório',
     }), 
    }).required(),
  }).required().messages({
    'any.required': 'O campo {#label} é obrigatório',
    'string.min': 'O {#label} deve ter pelo menos {#limit} caracteres',
    'number.min': 'A pessoa palestrante deve ser maior de idade',
    'number.integer': 'O campo "{#key}" deve ser um inteiro de 1 à 5',
    'date.format': 'O campo "{#key}" deve ter o formato "dd/mm/aaaa"',
  });

const validateCreateUser = async (req, res, next) => {
  const userCreate = req.body;
  const { error } = await checkUser.validate(userCreate);

  if (error !== undefined) {
     return res.status(400).send({ message: error.details[0].message });
  } 
  next();
};

module.exports = { 
  validateUser,
  validateToken,
  validateCreateUser,
  
 };