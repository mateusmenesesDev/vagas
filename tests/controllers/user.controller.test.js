const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const sinonChai = require("sinon-chai");

const { userService } = require('../../src/service');
const { getUsers, getUser, addUser } = require('../../src/controllers/user.controller');
const { success, notFound, internalError } = require('../../constants/httpStatus');
const usersMock = require('../../fakeData');
const oneUserMock = require('../mocks/oneUser.json')
const newUserMock = require('../mocks/newUser.json');

chai.use(sinonChai);

describe('Test controller for users route', () => {
  it('should return status 200 and all users', async () => {
    const req = {};
    const res = {};
    sinon.stub(userService, 'getUsers').resolves(usersMock);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await getUsers(req, res);
    expect(res.status).to.have.been.calledWith(success);
    expect(res.json).to.have.been.calledWith(usersMock);
    sinon.restore();
  });

  it('should return status 200 and a user when with route GET /user', async () => {
    const req = { query: { name: 'João Oliveira' } };
    const res = {};
    sinon.stub(userService, 'getUser').resolves(oneUserMock);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await getUser(req, res);
    expect(res.status).to.have.been.calledWith(success);
    expect(res.json).to.have.been.calledWith(oneUserMock);
    sinon.restore();
  });

  it('should return status 404 when user not found', async () => {
    const req = { query: { name: 'Esse usuário não existe' } };
    const res = {};
    sinon.stub(userService, 'getUser').throws(new Error('Usuário não encontrado'));
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await getUser(req, res);

    expect(res.status).to.have.been.calledWith(notFound);
    expect(res.json).to.have.been.calledWith({ message: "Usuário não encontrado" });

    sinon.restore();
  });

  it('should return status 200 when add new user', async () => {
    const req = { body: newUserMock };
    newUserMock.id = 2;
    const res = {};
    sinon.stub(userService, 'addUser').resolves(newUserMock);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await addUser(req, res);
    expect(res.status).to.have.been.calledWith(success);
    expect(res.json).to.have.been.calledWith({
      message: "Usuário adicionado",
      newUser: { ...newUserMock }
    });
    sinon.restore();
  });
})