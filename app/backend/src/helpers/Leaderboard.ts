import Match from '../domain/entities/Match';
import Team from '../domain/entities/Team';
import LeaderboardItem from '../domain/entities/LeaderboardItem';

// import TeamService from '../domain/services/TeamService';
// import MatchService from '../domain/services/MatchService';

export default class Leaderboard {
  // private teamService = new TeamService();
  // private matchService = new MatchService();

  private leaderboard: LeaderboardItem[];

  constructor(
    private teams: Team[],
    private finishedMatches: Match[],
    private type: 'home' | 'away' | 'general' = 'general',
  ) {
    if (this.type !== 'home' && this.type !== 'away') {
      this.type = 'general';
    }
    this.initialize();
  }

  private initialize(): void {
    console.log(this.type);

    const typeTeams: Team[] = [];
    this.finishedMatches.forEach(({ homeTeam, awayTeam }) => {
      if (this.type === 'home' || this.type === 'general') {
        typeTeams.push(this.teams.find(({ id }) => id === homeTeam) as Team);
      }
      if (this.type === 'away' || this.type === 'general') {
        typeTeams.push(this.teams.find(({ id }) => id === awayTeam) as Team);
      }
    });
    this.leaderboard = typeTeams.filter((team, i) => typeTeams.indexOf(team) === i)
      .map((team) => new LeaderboardItem(team));

    this.teams = typeTeams;
  }

  public generate(): LeaderboardItem[] {
    this.getStatsByMatch();
    this.sortList();
    return this.leaderboard;
  }

  private getStatsByTeam(): void {
    this.teams.forEach((team) => {
      const teamStats = this.leaderboard.find(({ name }) => team.teamName === name);
      const playedMatches: Match[] = this.finishedMatches.filter((match) => {
        if ((this.type === 'home' || this.type === 'general') && match.homeTeam === team.id) {
          return match;
        }
        if ((this.type === 'away' || this.type === 'general') && match.awayTeam === team.id) {
          return match;
        }
        return match.homeTeam === team.id;
      });

      playedMatches.forEach((match) => {
        this.computeMatch(match, teamStats as LeaderboardItem, teamStats as LeaderboardItem);
      });
    });
  }

  private getStatsByMatch(): void {
    this.finishedMatches.forEach((match) => {
      const teams = {
        home: this.leaderboard.find(({ name }) => this.teams
          .find(({ id }) => match.homeTeam === id)?.teamName === name),
        away: this.leaderboard.find(({ name }) => this.teams
          .find(({ id }) => match.awayTeam === id)?.teamName === name),
      };

      this.computeMatch(match, teams.home as LeaderboardItem, teams.away as LeaderboardItem);

      // const newTeam: LeaderboardItem = this.type === 'home'
      //   ? new LeaderboardItem(this.teams.find(({ id }) => (
      //     match.homeTeam === id)) as Team)
      //   : new LeaderboardItem(this.teams.find(({ id }) => (
      //     match.awayTeam === id)) as Team);

      // const existingTeam = this.leaderboard.find((item) => item.name === newTeam.name);
      // if (existingTeam) {
      //   this.computeMatch(match, existingTeam);
      // } else {
      //   this.computeMatch(match, newTeam);
      // }
    });
  }

  private computeMatch(match: Match, homeTeam: LeaderboardItem, awayTeam: LeaderboardItem): void {
    if (this.type === 'home' || this.type === 'general') {
      Leaderboard.computeHome(match, homeTeam);
    }
    if (this.type === 'away' || this.type === 'general') {
      Leaderboard.computeAway(match, awayTeam);
    }
  }

  private static computeHome(match: Match, team: LeaderboardItem): void {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      team.win(match.homeTeamGoals, match.awayTeamGoals);
    }
    if (match.homeTeamGoals < match.awayTeamGoals) {
      team.lose(match.homeTeamGoals, match.awayTeamGoals);
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      team.draw(match.homeTeamGoals, match.awayTeamGoals);
    }
  }

  private static computeAway(match: Match, team: LeaderboardItem): void {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      team.win(match.awayTeamGoals, match.homeTeamGoals);
    }
    if (match.awayTeamGoals < match.homeTeamGoals) {
      team.lose(match.awayTeamGoals, match.homeTeamGoals);
    }
    if (match.awayTeamGoals === match.homeTeamGoals) {
      team.draw(match.awayTeamGoals, match.homeTeamGoals);
    }
  }

  private sortList(): void {
    const sorted = this.leaderboard.sort((a, b) => {
      const points = Leaderboard.resolvePoints(a, b);
      const wins = Leaderboard.resolveWins(a, b);
      const goalsBalance = Leaderboard.resolveGoalsBalance(a, b);
      const goalsFavor = Leaderboard.resolveGoalsFavor(a, b);
      const goalsOwn = Leaderboard.resolveGoalsOwn(a, b);
      if (points) return points;
      if (wins) return wins;
      if (goalsBalance) return goalsBalance;
      if (goalsFavor) return goalsFavor;
      if (goalsOwn) return goalsOwn;
      return 0;
    });
    this.leaderboard = sorted;
  }

  private static resolvePoints(a: LeaderboardItem, b: LeaderboardItem): number | void {
    if (a.totalPoints > b.totalPoints) {
      return -1;
    }
    if (a.totalPoints < b.totalPoints) {
      return 1;
    }
  }

  private static resolveWins(a: LeaderboardItem, b: LeaderboardItem): number | void {
    if (a.totalVictories > b.totalVictories) {
      return -1;
    }
    if (a.totalVictories < b.totalVictories) {
      return 1;
    }
  }

  private static resolveGoalsBalance(a: LeaderboardItem, b: LeaderboardItem): number | void {
    if (a.goalsBalance > b.goalsBalance) {
      return -1;
    }
    if (a.goalsBalance < b.goalsBalance) {
      return 1;
    }
  }

  private static resolveGoalsFavor(a: LeaderboardItem, b: LeaderboardItem): number | void {
    if (a.goalsFavor > b.goalsFavor) {
      return -1;
    }
    if (a.goalsFavor < b.goalsFavor) {
      return 1;
    }
  }

  private static resolveGoalsOwn(a: LeaderboardItem, b: LeaderboardItem): number | void {
    if (a.goalsOwn > b.goalsOwn) {
      return 1;
    }
    if (a.goalsOwn < b.goalsOwn) {
      return -1;
    }
  }

  // private async filterTeams(): Team[] {
  //   this.finishedMatches.forEach(({ awayTeam, homeTeam }) => {
  //     if (!this.teams.includes(awayTeam)) {
  //       this.teams.push()
  //     }
  //   });
  // }

  // private static matchPoints(match: Match, team: Leaderboard)
  //   : { homePoints: number, awayPoints: number } {
  //   const { homeTeamGoals, awayTeamGoals } = match;
  //   const result = { homePoints: 0, awayPoints: 0 };

  //   if (match.inProgress === true) { return result; }

  //   if (homeTeamGoals > awayTeamGoals) {
  //     result.homePoints = 3;
  //   } else if (homeTeamGoals < awayTeamGoals) {
  //     result.awayPoints = 3;
  //   } else {
  //     result.homePoints = 1;
  //     result.awayPoints = 1;
  //   }
  //   return result;
  // }
  // public calcPoints(team: Team['id'] | Team['teamName']): LeaderboardItem {

  // public async teamEfficiency(team: Team): { efficiency: number } {
  // }
}
