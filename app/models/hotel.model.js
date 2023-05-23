module.exports = (sequelize, Sequelize) => {
  const Hotel = sequelize.define("hotel", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    PhoneNumber : {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Address: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    
  });
  return Hotel;
};

