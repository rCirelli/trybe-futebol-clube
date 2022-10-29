import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import LeaderboardItem from '../domain/entities/LeaderboardItem';

import { home, away, general } from './mocks/leaderboard';
import teams from './mocks/teams';
import { finished } from './mocks/matches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test leaderboard endpoint', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('should respond with "home" leaderboard', async () => {
    sinon
      .stub(Team, "findAll").onFirstCall()
      .resolves(teams as Team[]);
    sinon
      .stub(Match, "findAll").onFirstCall()
      .resolves(finished as Match[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(home);
  });

  it('should respond with "away" leaderboard', async () => {
    sinon
      .stub(Team, "findAll").onFirstCall()
      .resolves(teams as Team[]);
    sinon
      .stub(Match, "findAll").onFirstCall()
      .resolves(finished as Match[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(away);
  });

  it('should respond with "general" leaderboard', async () => {
    sinon
      .stub(Team, "findAll").onFirstCall()
      .resolves(teams as Team[]);
    sinon
      .stub(Match, "findAll").onFirstCall()
      .resolves(finished as Match[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(general);
  });
});
