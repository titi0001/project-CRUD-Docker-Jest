const express = require('express');
const bodyParser = require('body-parser');
const { validateUser } = require('./middleware/validateUsers');

const router = require('./routes/talkerRouter');

const { readUserToken } = require('./utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.post('/login', validateUser, async (req, res) => {
  const { email, password } = req.body;
  const tokenId = await readUserToken(email, password);
  res.status(HTTP_OK_STATUS).send({ token: tokenId });
});

app.use('/talker', router);
