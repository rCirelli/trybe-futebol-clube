import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../domain/services/MatchService';

export default class TeamController {
  private matchService = new MatchService();

  public async getAll(_req: Request, res: Response) {
    const matches = await this.matchService.getAll();
    res.status(StatusCodes.OK).send(matches);
  }
}
