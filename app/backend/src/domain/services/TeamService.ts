import { StatusCodes } from 'http-status-codes';
import HttpException from '../../helpers/HttpException';
import Team from '../entities/Team';
import TeamModel from '../../database/models/TeamModel';

export default class TeamService {
  private teamModel = TeamModel;

  public getAll(): Promise<Team[]> {
    return this.teamModel.findAll();
  }

  public async findById(id: Team['id']): Promise<Team> {
    const team = await this.teamModel.findOne({ where: { id } });
    if (!team) throw new HttpException(StatusCodes.NOT_FOUND, 'Team not found');
    return team;
  }
}
