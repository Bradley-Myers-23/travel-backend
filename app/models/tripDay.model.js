module.exports = (sequelize, Sequelize) => {
  const TripDay = sequelize.define("tripDay", {
    dayNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return TripDay;
};
