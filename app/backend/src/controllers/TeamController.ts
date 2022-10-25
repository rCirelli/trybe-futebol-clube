import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../domain/services/TeamService';

export default class TeamController {
  private teamService = new TeamService();

  public async getAll(_req: Request, res: Response) {
    const teams = await this.teamService.getAll();
    res.status(StatusCodes.OK).send(teams);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.findById(Number(id));
    res.status(StatusCodes.OK).send(team);
  }
}
