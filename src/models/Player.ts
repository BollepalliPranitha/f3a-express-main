import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Player extends Model {}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
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
    tableName: 'player', // Add this line to specify the table name
    timestamps: false,
  }
);

export default Player;
