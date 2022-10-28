import IMatch from './IMatch';

export default class Match implements IMatch {
  public readonly id: number;
  public readonly homeTeam: number;
  public homeTeamGoals: number;
  public readonly awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;

  constructor() {
    this.id = 0;
    this.homeTeam = 0;
    this.homeTeamGoals = 0;
    this.awayTeam = 0;
    this.awayTeamGoals = 0;
    this.inProgress = false;
  }
}
