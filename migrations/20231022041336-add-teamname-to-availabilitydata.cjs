// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AvailabilityData', 'teamName', {
      type: Sequelize.STRING, // Adjust the data type as needed
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AvailabilityData', 'teamName');
  },
};
