const db = require("../models");
const TripDay = db.TripDay;
const TripIngredient = db.TripIngredient;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;
// Create and Save a new TripDay
exports.create = (req, res) => {
  // Validate request
  if (req.body.DayNumber === undefined) {
    const error = new Error("Day number cannot be empty for Trip Day!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.instruction === undefined) {
    const error = new Error("Description cannot be empty for Trip Day!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.TripId === undefined) {
    const error = new Error("Trip ID cannot be empty for Trip Day!");
    error.statusCode = 400;
    throw error;
  }

  // Create a TripDay
  const TripDay = {
    DayNumber: req.body.DayNumber,
    instruction: req.body.instruction,
    TripId: req.body.TripId,
  };
  // Save TripDay in the database
  TripDay.create(TripDay)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TripDay.",
      });
    });
};
// Retrieve all TripDays from the database.
exports.findAll = (req, res) => {
  const TripDayId = req.query.TripDayId;
  var condition = TripDayId
    ? {
        id: {
          [Op.like]: `%${TripDayId}%`,
        },
      }
    : null;

  TripDay.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TripDays.",
      });
    });
};

// Retrieve all TripDays for a Trip from the database.
exports.findAllForTrip = (req, res) => {
  const TripId = req.params.TripId;

  TripDay.findAll({
    where: { TripId: TripId },
    order: [["DayNumber", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving TripDays for a Trip.",
      });
    });
};

// Find all TripDays for a Trip and include the ingredients
exports.findAllForTripWithIngredients = (req, res) => {
  const TripId = req.params.TripId;
  TripDay.findAll({
    where: { TripId: TripId },
    include: [
      {
        model: TripIngredient,
        as: "TripIngredient",
        required: false,
        include: [
          {
            model: Ingredient,
            as: "ingredient",
            required: false,
          },
        ],
      },
    ],
    order: [["DayNumber", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving TripIngredients for a Trip Day.",
      });
    });
};

// Find a single TripDay with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  TripDay.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find TripDay with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving TripDay with id=" + id,
      });
    });
};
// Update a TripDay by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  TripDay.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripDay was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update TripDay with id=${id}. Maybe TripDay was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating TripDay with id=" + id,
      });
    });
};
// Delete a TripDay with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  TripDay.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripDay was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete TripDay with id=${id}. Maybe TripDay was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete TripDay with id=" + id,
      });
    });
};
// Delete all TripDays from the database.
exports.deleteAll = (req, res) => {
  TripDay.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} TripDays were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all TripDays.",
      });
    });
};
