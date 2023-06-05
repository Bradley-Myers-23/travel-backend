module.exports = (sequelize, Sequelize) => {
    const UserType = sequelize.define("userType", {

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return UserType;
  };
  