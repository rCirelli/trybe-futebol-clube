import TeamService from './TeamService';
import MatchService from './MatchService';
import Leaderboard from '../../helpers/Leaderboard';
// import LeaderboardItem from '../entities/LeaderboardItem';

export default class LeaderboardService {
  private teamService = new TeamService();
  private matchService = new MatchService();

  public async home() { // : Promise<LeaderboardItem[]> {
    const params = await Promise.all([
      await this.teamService.getAll(),
      await this.matchService.getAll(false),
    ]);
    const [teams, matches] = params;
    const leaderboard = new Leaderboard(teams, matches, 'homeTeam');
    return leaderboard.generate();
  }
}
