// models/index.ts
import AvailabilityData from './AvailabilityData';
import Player from './Player';

// Define associations
Player.hasMany(AvailabilityData, { foreignKey: 'playerName' });
AvailabilityData.belongsTo(Player, { foreignKey: 'playerName' });
