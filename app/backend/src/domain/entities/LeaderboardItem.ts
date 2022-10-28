import ILeaderboardItem from './ILeaderboardItem';
import Team from './Team';

export default class LeaderboardItem implements ILeaderboardItem {
  public readonly name: string;
  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: number;

  constructor(team: Team) {
    this.name = team.teamName || '';
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  public win(goalsFavor: number, goalsOwn: number): void {
    this.totalPoints += 3;
    this.totalGames += 1;
    this.totalVictories += 1;
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.updateEfficiency();
  }

  public lose(goalsFavor: number, goalsOwn: number): void {
    this.totalGames += 1;
    this.totalLosses += 1;
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.updateEfficiency();
  }

  public draw(goalsFavor: number, goalsOwn: number): void {
    this.totalPoints += 1;
    this.totalGames += 1;
    this.totalDraws += 1;
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.updateEfficiency();
  }

  private updateEfficiency(): void {
    const efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
    this.efficiency = Number(efficiency);
  }
}
