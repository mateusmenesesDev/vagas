const { badRequest } = require('../../constants/httpStatus');

function hasNameParam(req, res, next) {
  if (req.query.name) return next();
  return res.status(badRequest).json({ message: 'É obrigatório o envio do nome de usuário por query' })
}

function hasNewUserBody(req, res, next) {
  const nullBodyErr = 'É obrigatório informar o nome e cargo do novo usuário';
  const nameErr = 'É obrigatório informar o nome do novo usuário';
  const jobErr = 'É obrigatório informar o cargo do novo usuário';
  if (!req.body.name && !req.body.job) return res.status(badRequest).json({ message: nullBodyErr });
  if (!req.body.name) return res.status(badRequest).json({ message: nameErr });
  if (!req.body.job) return res.status(badRequest).json({ message: jobErr });
  return next();
}

function isIdNumber(req, res, next) {
  const { id } = req.query;
  if (!Number(id)) return res.status(badRequest).json({ message: 'O id precisa ser um número' });
  return next();
}

function isAuthCorrect(req, res, next) {
  const { authorization } = req.headers;
  const userAuth = 'ABC123'
  if (userAuth === authorization) return next();
  return res.status(407).json({ message: 'Token de autentificação incorreto' })
}
function hasAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(407).json({ message: 'Necessário autentificação' })
  return next();
}

module.exports = { hasNameParam, hasNewUserBody, isIdNumber, hasAuth, isAuthCorrect }