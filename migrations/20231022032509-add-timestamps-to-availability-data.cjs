// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AvailabilityData', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('AvailabilityData', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AvailabilityData', 'createdAt');
    await queryInterface.removeColumn('AvailabilityData', 'updatedAt');
  },
};
