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

module.exports = {
  readTalkerData,
};