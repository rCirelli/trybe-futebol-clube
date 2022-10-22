import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import users from './mocks/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test login endpoint', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    const USER = users[0];
    sinon
      .stub(User, "findOne")
      .resolves(USER as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('should return token and redirect to games when correct credentials are provided', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "admin@admin.com",
        "password": "secret_admin"
      });
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });
});
