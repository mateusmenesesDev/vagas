const { success, notFound, badRequest, internalError } = require('../../constants/httpStatus');
const { userService } = require('../service');

const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  return res.status(success).json(users);
};

const getUser = async (req, res) => {
  try {
    const name = req.query.name;
    const user = await userService.getUser(name);
    return res.status(success).json(user);
  } catch (err) {
    return res.status(notFound).json({ message: err.message });
  }
};

const addUser = async (req, res) => {
  const { name, job } = req.body;
  try {
    const newUser = {
      name,
      job,
    }
    const newUserResult = await userService.addUser(newUser);
    return res.status(success).json({ message: 'Usuário adicionado', newUser: newUserResult });
  } catch (err) {
    return res.status(badRequest).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { name } = req.query;
  try {
    const deletedUser = await userService.deleteUser(name);
    return res.status(success).json({ message: 'Usuário deletado', deletedUser });
  } catch (err) {
    return res.status(notFound).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const id = Number(req.query.id);
  const { name, job } = req.body;
  const update = { id, name, job }
  try {
    const updatedUser = await userService.updateUser(update);
    return res.status(success).json({ message: 'Usuário atualizado', updatedUser })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const getUserAccessCount = async (req, res) => {
  const { name } = req.query;
  try {
    const userInfo = await userService.getUserAccessCount(name);
    const message = `Usuário: ${userInfo.name} foi lido ${userInfo.getCount} vezes.`
    return res.status(success).json(message);
  } catch (err) {
    return res.status(notFound).json(err.message)
  }
}
module.exports = { getUsers, getUser, addUser, deleteUser, updateUser, getUserAccessCount };
