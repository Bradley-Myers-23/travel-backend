const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ingredient = require("./ingredient.model.js")(sequelize, Sequelize);
db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.recipeStep = require("./recipeStep.model.js")(sequelize, Sequelize);
db.recipeIngredient = require("./recipeIngredient.model.js")(
  sequelize,
  Sequelize
);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.site = require("./site.model.js")(sequelize, Sequelize);
db.hotel = require("./hotel.model.js")(sequelize, Sequelize);
db.trip = require("./trip.model.js")(sequelize, Sequelize);
db.tripSite = require("./tripSite.model.js")(sequelize, Sequelize);
db.tripDay = require("./tripDay.model.js")(sequelize, Sequelize);
db.day = require("./day.model.js")(sequelize, Sequelize);
db.userTrip = require("./userTrip.model.js")(sequelize, Sequelize);

// foreign keys for tripSite
db.tripDay.hasMany(
  db.tripSite,
  { as: "tripSite" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.trip.hasMany(
  db.tripSite,
  { as: "tripSite" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.site.hasMany(
  db.tripSite,
  { as: "tripSite" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tripSite.belongsTo(
  db.tripDay,
  { as: "tripDay" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.tripSite.belongsTo(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tripSite.belongsTo(
  db.site,
  { as: "site" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for userTrip
db.userTrip.belongsTo(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.userTrip.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);


// foreign key for tripDay
db.trip.hasMany(
  db.tripDay,
  { as: "tripDay" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tripDay.belongsTo(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign keys for recipeIngredient
db.recipeStep.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipe.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.ingredient.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.recipeStep,
  { as: "recipeStep" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.ingredient,
  { as: "ingredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.hotel.hasMany(
  db.day,
  { as: "day" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.day.belongsTo(
  db.hotel,
  { as: "hotel" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
