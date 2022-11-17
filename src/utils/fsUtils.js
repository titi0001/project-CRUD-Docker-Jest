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

const readUserToken = async (_email, _password) => {
  const tokenUser = randToken.generate(16);
  return tokenUser;
};

const createNewUser = async (newTalker) => {
  const { name, age, talk: { watchedAt, rate } } = newTalker;
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
  await fs.writeFile((path.resolve(__dirname, TALKERS_DATA_PATH)), JSON.stringify(talker, null, 2));
  return talker;
};

const createNewEditTalker = async (reqId, editTalker) => {
  const editTalkers = await readTalkerData();
  const { name, age, talk: { watchedAt, rate } } = editTalker;
  const findIdTalker = await readTalkerId(reqId);
  const edit = {
    ...findIdTalker,
    name,
    age,
    talk: { watchedAt, rate },
  };
  const endTalkers = editTalkers
  .reduce((prev, cur) => (cur.id === edit.id ? [...prev, edit] : [...prev, cur]), []);
  
  await
  fs.writeFile((path.resolve(__dirname, TALKERS_DATA_PATH)), JSON.stringify(endTalkers, null, 2));
  return edit;
};

const deleteTalkers = async (delId) => {
  const data = await fs.readFile(path.resolve(__dirname, TALKERS_DATA_PATH));
  const delTalkerId = JSON.parse(data).filter(({ id }) => id !== Number(delId));
  fs.writeFile((path.resolve(__dirname, TALKERS_DATA_PATH)), JSON.stringify(delTalkerId, null, 2));

  return delTalkerId;
};

module.exports = {
  readTalkerData,
  readTalkerId,
  readUserToken,
  createNewUser,
  createNewEditTalker,
  deleteTalkers,
};
