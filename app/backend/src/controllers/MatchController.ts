import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../domain/services/MatchService';

export default class TeamController {
  private matchService = new MatchService();

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    let param: boolean | null;
    if (inProgress === undefined) {
      param = null;
    } else {
      param = inProgress === 'true' ? !!1 : !!0;
    }

    const matches = await this.matchService.getAll(param);
    res.status(StatusCodes.OK).send(matches);
  }
}
