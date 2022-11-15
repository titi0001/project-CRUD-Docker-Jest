const express = require('express');
require('express-async-errors');
const { readTalkerData, readTalkerId, createNewUser } = require('../utils/fsUtils');
const { validateToken, validateCreateUser } = require('../middleware/validateUsers');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;

router.get('/', async (_req, res) => {
   const talker = await readTalkerData();

   return talker.length === 0
  ? res.status(HTTP_OK_STATUS).json([])
   : res.status(HTTP_OK_STATUS).json(talker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const readId = await readTalkerId(id); 
  
  return readId === undefined 
  ? res.status(HTTP_NOTFOUND_STATUS).send({ message: 'Pessoa palestrante não encontrada' })
  : res.status(HTTP_OK_STATUS).json(readId);
});

router.post('/', validateToken, validateCreateUser, async (req, res) => {
  const newTalker = req.body;
  const talkers = await createNewUser(newTalker);

   return res.status(201).send(talkers.at(-1));
});

module.exports = router;
