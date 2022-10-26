import Team from '../../database/models/TeamModel';
import MatchModel from '../../database/models/MatchModel';
import Match from '../entities/Match';

export default class MatchService {
  private matchModel = MatchModel;

  public getAll(inProgress: boolean | null): Promise<Match[]> {
    return inProgress === null
      ? this.matchModel.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ],
      })
      : this.matchModel.findAll({
        where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ],
      });
  }

  public async create(matchData: Match, inProgress = true): Promise<Match> {
    const newMatch = await this.matchModel.create({ ...matchData, inProgress });
    return newMatch;
  }
}
