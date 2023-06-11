const { userModel } = require('../models')

const userByNameExistsCheck = async (name) => {
  const users = await userModel.getUsers();
  const check = users.some((currentUser) => currentUser.name === name);
  return check;
};

const userByIdExistsCheck = async (id) => {
  const users = await userModel.getUsers();
  const check = users.some((currentUser) => currentUser.id === id);
  return check;
};

const getUsers = async () => {
  return await userModel.getUsers();
};

const getUser = async (name) => {
  try {
    const user = await userModel.getUser(name);
    if (!user) throw new Error('Usuário não encontrado')
    delete user.getCount;
    return user;
  } catch (err) {
    throw new Error(err.message)
  }
};

const addUser = async (user) => {
  try {
    const userExists = await userByNameExistsCheck(user.name);
    if (userExists) throw new Error('Usuário já existe no banco de dados');
    const newUser = await userModel.addUser(user);
    return newUser;
  } catch (err) {
    throw new Error(err);
  }
}

const deleteUser = async (name) => {
  try {
    const deletedUser = await userModel.deleteUser(name);
    return deletedUser;
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async (user) => {
  try {
    const userExists = await userByIdExistsCheck(user.id);
    if (!userExists) throw new Error('Usuario não existe no banco de dados');
    const updatedUser = await userModel.updateUser(user);
    return updatedUser;
  } catch (err) {
    throw new Error(err);
  }
};

const getUserAccessCount = async (name) => {
  try {
    const user = await userModel.getUserAccessCount(name);
    if (!user) throw new Error('Usuário não existe');
    return user;
  } catch (err) {
    throw new Error(err)
  };
}
module.exports = { getUsers, getUser, addUser, deleteUser, updateUser, getUserAccessCount }
