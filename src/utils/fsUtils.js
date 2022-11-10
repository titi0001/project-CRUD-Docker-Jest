const fs = require('fs').promises;
const path = require('path');

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

module.exports = {
  readTalkerData,
  readTalkerId,
};