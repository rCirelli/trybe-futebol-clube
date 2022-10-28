import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../domain/services/LeaderboardService';

export default class TeamController {
  private leaderboardService = new LeaderboardService();

  public async home(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.home();
    res.status(StatusCodes.OK).send(leaderboard);
  }
}
