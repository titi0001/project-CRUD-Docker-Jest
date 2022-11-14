const Joi = require('joi');

  const checkUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).required().messages({
    'any.required': 'O campo {#label} é obrigatório',
    'string.email': 'O {#label} deve ter o formato "email@email.com"',
    'string.min': 'O {#label} deve ter pelo menos {#limit} caracteres',
  });

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = checkUser.validate({ email, password });
  if (error !== undefined) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateUser };