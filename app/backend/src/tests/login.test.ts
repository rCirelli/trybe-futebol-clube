import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import * as jwt from 'jsonwebtoken';

import users from './mocks/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test login endpoint', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('should respond with token when correct credentials are provided', async () => {
    const USER = users[0];    
    sinon
      .stub(User, "findOne")
      .resolves(USER as User);

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

  it('should respond with unauthorized error when incorrect email is provided', async () => {
    const NOT_FOUND_USER = null;    
    sinon
      .stub(User, "findOne")
      .resolves(NOT_FOUND_USER);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "wrong@email.com",
        "password": "secret_admin"
      });
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ "message": "Incorrect email or password" });
  });

  it('should respond with unauthorized error when incorrect password is provided', async () => {
    const USER = users[0];    
    sinon
      .stub(User, "findOne")
      .resolves(USER as User);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "admin@admin.com",
        "password": "wrong_pass"
      });
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ "message": "Incorrect email or password" });
  });
  
  it('should respond with unauthorized error when a credential is incomplete or not present', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "password": "secret_admin"
    });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ "message": "All fields must be filled" });
  });

  it('should respond with user role', async () => {
    const jwtPayload = {
      "username": "Admin",
      "email": "admin@admin.com",
      "role": "admin",
      "iat": 1666651349
    };

    sinon
      .stub(jwt, "verify")
      .resolves(jwtPayload);

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjY2NTEzNDl9.ebdOvPELhhXqcsani03zQPbzw2591BSprHF8jhJHq10');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ "role": "admin" });
  });

  it('should respond with error when token not present', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate');
    expect(chaiHttpResponse.status).to.be.equal(403);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Authotization token missing' });
  });
});
