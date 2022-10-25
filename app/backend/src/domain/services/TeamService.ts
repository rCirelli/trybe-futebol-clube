import Team from '../entities/Team';
import TeamModel from '../../database/models/TeamModel';

export default class TeamService {
  private teamModel = TeamModel;

  public getAll(): Promise<Team[]> {
    return this.teamModel.findAll();
  }
}
