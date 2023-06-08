module.exports = (sequelize, Sequelize) => {
    const TripSite = sequelize.define("tripSite", {
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
    return TripSite;
  };
  