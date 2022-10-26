import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import teams from './mocks/teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test teams endpoint', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('should respond with all teams listed', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teams as Team[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teams);
  });

  it('should respond with team with id provided', async () => {
    const TEAM = teams[1];    
    sinon
      .stub(Team, "findOne")
      .resolves(TEAM as Team);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/2');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teams[1]);
  });

  it('should respond with team with id provided', async () => {
    const NOT_FOUND_TEAM = null;
    sinon
      .stub(Team, "findOne")
      .resolves(NOT_FOUND_TEAM);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/999');
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.deep.equal({ "message": "Team not found" });
  });
});
