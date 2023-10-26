// config/database.ts

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sql9653877', 'sql9653877', 'UzcvWtMePv', {
  host: 'sql9.freesqldatabase.com', // Replace with your database host
  dialect: 'mysql', // Replace with your database dialect (e.g., mysql, postgres, sqlite)
  logging: false, // Set to true to enable SQL query logging
});
// const sequelize = new Sequelize('SoccerGame', 'root', 'pranitha', {
//   host: 'localhost', // Replace with your database host
//   dialect: 'mysql', // Replace with your database dialect (e.g., mysql, postgres, sqlite)
//   logging: false, // Set to true to enable SQL query logging
// });
(async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
