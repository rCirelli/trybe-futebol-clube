import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';

import matches, { inProgress, finished, newMatch } from './mocks/matches';

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
      .get('/matches?inProgress=false');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(finished);
  });

  it('should respond with created team', async () => {
    sinon
      .stub(Match, "create")
      .resolves(newMatch as Match);

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjY2NTEzNDl9.ebdOvPELhhXqcsani03zQPbzw2591BSprHF8jhJHq10');
    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.deep.equal(newMatch);
  });

  it('should respond with error if token is invalid', async () => {
    sinon
      .stub(Match, "create")
      .resolves(newMatch as Match);

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      .set('Authorization', 'invalid_token');
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token'});
  });

  it('should respond with error when creating with 2 equal teams', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 16,
        "awayTeam": 16,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjY2NTEzNDl9.ebdOvPELhhXqcsani03zQPbzw2591BSprHF8jhJHq10');
    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams'});
  });

  it('should respond with error when a team does not exist', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 999,
        "awayTeam": 16,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjY2NTEzNDl9.ebdOvPELhhXqcsani03zQPbzw2591BSprHF8jhJHq10');
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'There is no team with such id!'});
  });

  it('should respond with message: "Finished" when id exists', async () => {
    sinon
      .stub(Match, "update")
      .resolves();

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/48/finish');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished'});
  });

  it('should respond with message: "Finished" when id does not exist', async () => {
    sinon
      .stub(Match, "update")
      .resolves();

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/999/finish');
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found'});
  });

  it('should respond with message: "Goals updated" when id exists', async () => {
    sinon
      .stub(Match, "update")
      .resolves();
      
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/48')
      .send(
        {
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        }
      );
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Goals updated'});
  });

  it('should respond with message: "Goals updated" when id does not exist', async () => {
    sinon
      .stub(Match, "update")
      .resolves();
      
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/999')
      .send(
        {
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        }
      );
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found'});
  });
});
