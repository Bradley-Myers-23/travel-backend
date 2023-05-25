const db = require("../models");
const Trip = db.trip;
const { Op } = require("sequelize");

// Create and Save a new Trip
exports.create = (req, res) => {
  // Validate request
  if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.fromDate === undefined || req.body.toDate === undefined) {
    const error = new Error("From Date and To Date cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Trip
  const trip = {
    description: req.body.description,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
  };

  // Save Trip in the database
  Trip.create(trip)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Trip.",
      });
    });
};

// Retrieve all Trips from the database
exports.findAll = (req, res) => {
  const tripId = req.query.tripId;
  let condition = tripId ? { id: { [Op.like]: `%${tripId}%` } } : null;

  Trip.findAll({ where: condition, order: [["description", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving trips.",
      });
    });
};

// Find a single Trip by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Trip.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Trip with id=" + id,
      });
    });
};

// Update a Trip by ID
exports.update = (req, res) => {
  const id = req.params.id;

  Trip.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Trip was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Trip with id=${id}. Maybe Trip was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Trip with id=" + id,
      });
    });
};

// Delete a Trip by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Trip.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Trip was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Trip with id=${id}. Maybe Trip was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Trip with id=" + id,
      });
    });
};

// Delete all Trips from the database
exports.deleteAll = (req, res) => {
  Trip.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Trips were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all trips.",
      });
    });
};
