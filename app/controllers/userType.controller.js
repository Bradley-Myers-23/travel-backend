const db = require("../models");
const UserType = db.userType;
const Op = db.Sequelize.Op;

// Create and Save a new UserType
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for User Type!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for User Type!");
    error.statusCode = 400;
    throw error;
  }
  // Create a UserType
  const userType = {
    name: req.body.name,
    description: req.body.description
  };

  // Save UserType in the database
  UserType.create(userType)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User Type.",
      });
    });
};

// Retrieve all User Type from the database.
exports.findAll = (req, res) => {
  const userTypeId = req.query.userTypeId;
  var condition = userTypeId
    ? {
        id: {
          [Op.like]: `%${userTypeId}%`,
        },
      }
    : null;

  UserType.findAll({ where: condition, order: [["name", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User Type.",
      });
    });
};

// Find a single User Type with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserType.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User Type with id=" + id,
      });
    });
};

// Update a User Type by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UserType.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User Type was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User Type with id=${id}. Maybe User Type was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User Type with id=" + id,
      });
    });
};

// Delete a User Type with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserType.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User Type was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User Type with id=${id}. Maybe User Type was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not User Type with id=" + id,
      });
    });
};

// Delete all User Types from the database.
exports.deleteAll = (req, res) => {
  UserType.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} User Types were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User Types.",
      });
    });
};
