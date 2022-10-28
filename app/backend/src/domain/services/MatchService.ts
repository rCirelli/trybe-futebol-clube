import TeamModel from '../../database/models/TeamModel';
import MatchModel from '../../database/models/MatchModel';
import Match from '../entities/Match';
import sequelize from '../../database/models';

export default class MatchService {
  private matchModel = MatchModel;

  public getAll(inProgress: boolean | null): Promise<Match[]> {
    return inProgress === null
      ? this.matchModel.findAll({
        include: [
          { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
          { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
        ],
      })
      : this.matchModel.findAll({
        where: { inProgress },
        include: [
          { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
          { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
        ],
      });
  }

  public async create(matchData: Match): Promise<Match> {
    const newMatch = await this.matchModel.create({ ...matchData, inProgress: true });
    return newMatch;
  }

  public async finishMatch(id: Match['id']): Promise<void> {
    try {
      await sequelize.transaction(async (t) => {
        const [affectedRows] = await this.matchModel.update(
          { inProgress: false },
          { where: { id }, transaction: t },
        );
        return affectedRows;
      });
    } catch (e) {
      console.log('ERROR', e);
      throw e;
    }
  }

  public async setGoals(
    id: Match['id'],
    homeTeamGoals: Match['homeTeamGoals'],
    awayTeamGoals: Match['awayTeamGoals'],
  ): Promise<void> {
    try {
      await sequelize.transaction(async (t) => {
        const [affectedRows] = await this.matchModel.update(
          { homeTeamGoals, awayTeamGoals },
          { where: { id }, transaction: t },
        );
        return affectedRows;
      });
    } catch (e) {
      console.log('ERROR', e);
      throw e;
    }
  }
}
