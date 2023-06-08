module.exports = (sequelize, Sequelize) => {
    const Day = sequelize.define("day", {
      day : {
        type: Sequelize.DATE,
        allowNull: true,
      },
      
    });
    return Day;
  };
  