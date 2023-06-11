const express = require('express');
const userRoutes = express.Router();
const { getUser, getUsers, addUser, deleteUser, updateUser, getUserAccessCount } = require('../user.controller');

const { hasNameParam, hasNewUserBody, isIdNumber, hasAuth, isAuthCorrect } = require('../../middleware/user.middleware');

userRoutes.get("/user", hasNameParam, getUser);
userRoutes.get("/users", getUsers);
userRoutes.post("/users", hasNewUserBody, addUser);
userRoutes.delete("/users", hasAuth, isAuthCorrect, hasNameParam, deleteUser);
userRoutes.put("/users", hasAuth, isAuthCorrect, isIdNumber, hasNewUserBody, updateUser)
userRoutes.get("/users/access", hasNameParam, getUserAccessCount);

module.exports = userRoutes;