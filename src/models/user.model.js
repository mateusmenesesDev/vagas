const { readFile, writeFile } = require('../utils/readAndWriteFiles');

const getUsers = async () => {
  try {
    const data = await readFile();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

const updateUserGetCount = async (user) => {
  try {
    const data = await readFile();
    const userUpdated = data.find((currentUser) => currentUser.id === user.id);
    userUpdated.getCount += 1;
    await writeFile(data);
  } catch (err) {
    throw new Error(err)
  }
}

const getUserAccessCount = async (name) => {
  try {
    const data = await readFile();
    const user = data.find((currentUser) => currentUser.name === name);
    return user;
  } catch (err) {
    throw new Error(err)
  }
}

const userByNameExistsCheck = async (name) => {
  const users = await getUsers();
  const check = users.some((currentUser) => currentUser.name === name);
  if (!check) return false;
  return users;
};

const getUser = async (name) => {
  try {
    const data = await readFile();
    const user = await data.find((currentUser) => currentUser.name === name)
    if (user) {
      await updateUserGetCount(user)
    }
    return user;
  } catch (err) {
    throw new Error(err.message)
  }
};

const addUser = async (user) => {
  try {
    const data = await readFile();
    const newUser = { id: data.length + 1, ...user }
    await writeFile([...data, newUser]);
    return newUser;
  } catch (err) {
    throw new Error(err.message);
  }
}

const deleteUser = async (name) => {
  try {
    const data = await userByNameExistsCheck(name);
    if (!data) throw new Error('Usuário não existe no banco de dados')
    const newUsers = data.filter((currentUser) => currentUser.name !== name);
    await writeFile(newUsers);
    return true;
  } catch (err) {
    throw new Error(err.message)
  }
}

const updateUser = async (user) => {
  try {
    const data = await readFile();
    const userUpdated = data.find((currentUser) => currentUser.id === user.id);
    userUpdated.name = user.name;
    userUpdated.job = user.job;
    await writeFile(data);
    return userUpdated;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { getUser, getUsers, addUser, deleteUser, updateUser, getUserAccessCount }