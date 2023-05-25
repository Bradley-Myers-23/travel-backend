module.exports = (sequelize, Sequelize) => {
    const Trip = sequelize.define("trip", {
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fromDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      toDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  
    return Trip;
  };
  