const express = require('express');
const bodyParser = require('body-parser');
const { validateUser } = require('./middlewares/validateUsers');

const { readTalkerData, readTalkerId, readUser } = require('./utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
   const talker = await readTalkerData();

   return talker.length === 0
  ? res.status(HTTP_OK_STATUS).json([])
   : res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const readId = await readTalkerId(id); 
  
  return readId === undefined 
  ? res.status(HTTP_NOTFOUND_STATUS).send({ message: 'Pessoa palestrante não encontrada' })
  : res.status(HTTP_OK_STATUS).json(readId);
});

app.post('/login', validateUser, async (req, res) => {
  const { email, password } = req.body;
  const tokenId = await readUser(email, password);
  res.status(HTTP_OK_STATUS).send({ token: tokenId });
});
