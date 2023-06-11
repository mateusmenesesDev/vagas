const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const sinonChai = require("sinon-chai");

const usersMock = require('../../fakeData');
const oneUserMock = require('../mocks/oneUser.json');
const { userService } = require('../../src/service');
const { userModel } = require('../../src/models');
const newUserMock = require('../mocks/newUser.json');

chai.use(sinonChai);

describe('Test services for users route', () => {
  it('Should return all users', async () => {
    sinon.stub(userModel, 'getUsers').resolves(usersMock);
    const users = await userService.getUsers();
    expect(users).to.be.deep.equal(usersMock);
    sinon.restore()
  });
  it('Should return a user', async () => {
    sinon.stub(userModel, 'getUser').resolves(oneUserMock);
    const user = await userService.getUser('João Oliveira');
    expect(user).to.be.deep.equal(oneUserMock);
    sinon.restore()
  });
  it('Should return a error when user does not exists', async () => {
    sinon.stub(userModel, 'getUser').resolves(undefined);
    try {
      const user = await userService.getUser('Mateus Meneses')
    } catch (error) {
      expect(error.message).to.be.deep.equal("Usuário não encontrado");
      // expect(err).to.be.deep.equal({ Error: 'Usuário não encontrado' });
    }
    sinon.restore()
  });

  it('Should add new user', async () => {
    const insertedUser = {
      id: 2,
      ...newUserMock
    }
    sinon.stub(userModel, 'addUser').resolves(insertedUser);
    const user = await userService.addUser(newUserMock);
    expect(user).to.be.deep.equal(insertedUser)
    sinon.restore()
  });

  it('Should return error for add new user', async () => {
    sinon.stub(userModel, 'addUser').resolves(new Error('Error opening file'));
    const user = await userService.addUser(newUserMock);
    expect(user.message).to.be.deep.equal('Error opening file')
    sinon.restore()
  });

  it('Should delete a user', async () => {
    sinon.stub(userModel, 'deleteUser').resolves(true);
    const user = await userService.deleteUser('Usuário a deletar');
    expect(user).to.be.deep.equal(true)
    sinon.restore()
  });
})