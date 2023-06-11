const fs = require('fs/promises');

const FILENAME = 'src/fakeData.json';

const readFile = async () => {
  try {
    const users = await fs.readFile(FILENAME, 'utf-8');
    return JSON.parse(users);
  } catch (error) {
    const err = new Error('Error opening file');
    err.statusCode = 500;
    throw err;
  }
};

const writeFile = async (data) => {
  await fs.writeFile(FILENAME, JSON.stringify(data), 'utf-8');
};

module.exports = { writeFile, readFile };