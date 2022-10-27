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

  public async create(req: Request, res: Response) {
    const matchData = req.body;
    const newMatch = await this.matchService.create(matchData);
    res.status(StatusCodes.CREATED).send(newMatch);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    res.status(StatusCodes.OK).send({ message: 'Finished' });
  }

  public async setGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.setGoals(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(StatusCodes.OK).send({ message: 'Goals updated' });
  }
}
