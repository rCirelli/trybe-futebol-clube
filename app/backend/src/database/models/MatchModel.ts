import { Model, INTEGER, BOOLEAN } from 'sequelize';
import Team from './TeamModel';
import db from '.';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

Team.belongsTo(Match, { foreignKey: 'id', as: 'teamHome', targetKey: 'homeTeam' });
Team.belongsTo(Match, { foreignKey: 'id', as: 'teamAway', targetKey: 'awayTeam' });

Match.hasOne(Team, { foreignKey: 'id', as: 'teamHome', sourceKey: 'homeTeam' });
Match.hasOne(Team, { foreignKey: 'id', as: 'teamAway', sourceKey: 'awayTeam' });

export default Match;
