const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const sinonChai = require("sinon-chai");

const usersMock = require('../../fakeData');
const oneUserMock = require('../mocks/oneUser.json');
const newUserMock = require('../mocks/newUser.json');
const { userModel } = require('../../src/models');

chai.use(sinonChai);

describe('Test model for users route', () => {
  it('Should return all users', async () => {
    sinon.stub(userModel, 'getUsers').resolves(usersMock);
    const users = await userModel.getUsers();
    expect(users).to.be.deep.equal(usersMock);
    sinon.restore()
  });
  it('Should return undefined when DB has no users', async () => {
    sinon.stub(userModel, 'getUsers').resolves(undefined);
    const users = await userModel.getUsers();
    expect(users).to.be.deep.equal(undefined);
    sinon.restore()
  });
  it('Should return a user', async () => {
    sinon.stub(userModel, 'getUser').resolves(oneUserMock);
    const name = 'João Oliveira';
    const user = await userModel.getUser(name);
    expect(user).to.be.deep.equal(oneUserMock);
    sinon.restore()
  });
  it('Should return undefined when user does not exists', async () => {
    sinon.stub(userModel, 'getUser').resolves(undefined);
    const name = 'Mateus Meneses';
    const user = await userModel.getUser(name);
    expect(user).to.be.deep.equal(undefined);
    sinon.restore()
  });
  it('Should add new user', async () => {
    const insertedUser = {
      "id": 2,
      ...newUserMock
    };
    sinon.stub(userModel, 'addUser').resolves(insertedUser);
    const user = await userModel.addUser(newUserMock);
    expect(user).to.be.deep.equal(insertedUser);
    sinon.restore();
  });
  it('Should delete a user', async () => {
    sinon.stub(userModel, 'deleteUser').resolves(true);
    const user = await userModel.deleteUser(newUserMock);
    expect(user).to.be.deep.equal(true);
    sinon.restore();
  });
})