import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../domain/services/LeaderboardService';

export default class TeamController {
  private leaderboardService = new LeaderboardService();

  public async leaderboard(req: Request, res: Response) {
    const type = req.path.replace('/', '');
    const leaderboard = await this.leaderboardService.leaderboard(type as 'home' | 'away');
    res.status(StatusCodes.OK).send(leaderboard);
  }
}
