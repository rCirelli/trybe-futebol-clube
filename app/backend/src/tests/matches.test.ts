import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';

import matches, { inProgress, finished } from './mocks/matches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test matches endpoint', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('should respond with all matches listed', async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matches as Match[]);
    
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(matches);
  });

  it('should respond with all matches in progress', async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(inProgress as Match[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(inProgress);
  });

  it('should respond with all matches finished', async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(finished as Match[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(finished);
  });
});
