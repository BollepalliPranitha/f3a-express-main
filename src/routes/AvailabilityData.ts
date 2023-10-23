// models/AvailabilityData.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class AvailabilityData extends Model {
  public id!: number;
  public playerName!: string;
  public matchDay!: Date;
  public availability!: string;
}

AvailabilityData.init(
  {
    playerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matchDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'AvailabilityData',
  }
);

export default AvailabilityData;
