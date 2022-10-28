import ITeam from './ITeam';

export default class Team implements ITeam {
  public readonly id: number;
  public teamName: string;

  constructor() {
    this.id = 0;
    this.teamName = '';
  }
}
