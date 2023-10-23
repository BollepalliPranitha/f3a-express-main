import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class AvailabilityData extends Model {
  availability: unknown;
}

AvailabilityData.init(
  {
    playerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matchDay: {
      type: DataTypes.DATEONLY, // Use DATEONLY if you want to store only the date without time
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'AvailabilityData',
  }
);

sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(error => {
    console.error('Database synchronization failed:', error);
  });

export default AvailabilityData;
