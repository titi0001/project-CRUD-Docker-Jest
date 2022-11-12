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

const readUser = (_email, _password) => {
  const tokenUser = randToken.generate(16);
  return tokenUser;
};

module.exports = {
  readTalkerData,
  readTalkerId,
  readUser,
};
