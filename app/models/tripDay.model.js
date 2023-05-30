module.exports = (sequelize, Sequelize) => {
    const TripDay = sequelize.define("TripDay", {
      DayNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      instruction: {
        type: Sequelize.STRING(5000),
        allowNull: false,
      },
    });
    return TripDay;
  };
  