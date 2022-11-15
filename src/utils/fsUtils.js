const fs = require('fs').promises;
const path = require('path');
const randToken = require('rand-token');

const TALKERS_DATA_PATH = '../talker.json';

const readTalkerData = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKERS_DATA_PATH));
    const talker = JSON.parse(data);
    return talker;
  } catch (error) {
    console.log(`Error na leitura do arquivo ${error}`);
  }
};

const readTalkerId = async (userId) => {
  const data = await fs.readFile(path.resolve(__dirname, TALKERS_DATA_PATH));
  const talkerId = JSON.parse(data).find(({ id }) => id === Number(userId));
  return talkerId;
};

const readUserToken = (_email, _password) => {
  const tokenUser = randToken.generate(16);
  return tokenUser;
};

const createNewUser = async ({ name, age, watchedAt, rate }) => {
  const talker = await readTalkerData();
  const id = Number(talker[talker.length - 1].id) + 1;
  talker.push({ name,
  age,
  id,
  talk: {
    watchedAt,
    rate,
  },
   });
  await fs.writeFile(TALKERS_DATA_PATH, JSON.stringify(talker, null, 2));
  return id;
};

module.exports = {
  readTalkerData,
  readTalkerId,
  readUserToken,
  createNewUser,
};
