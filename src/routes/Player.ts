// models/Player.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Player extends Model {
  public id!: number;
  public name!: string;
  public team!: string;
}

Player.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Player',
  }
);

export default Player;
