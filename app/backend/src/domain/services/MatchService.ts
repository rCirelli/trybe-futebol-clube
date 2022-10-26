import Team from '../../database/models/TeamModel';
import MatchModel from '../../database/models/MatchModel';
import Match from '../entities/Match';

export default class MatchService {
  private matchModel = MatchModel;

  public getAll(): Promise<Match[]> {
    return this.matchModel.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
  }
}
