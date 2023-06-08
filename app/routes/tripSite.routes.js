const TripSite = require("../controllers/tripSite.controller.js");
const router = require("express").Router();
const { authenticateRoute } = require("../authentication/authentication");


// Create a new Trip Site for a Trip
router.post(
  "/trips/:tripId/tripSites/",
  [authenticateRoute],
  TripSite.create
);

// Retrieve all Trip Sites
router.get("/tripSites/", TripSite.findAll);

// Retrieve all Trip Sites for a Trip
router.get(
  "/trips/:tripId/tripSites/",
  TripSite.findAllForTrip
);

// Retrieve all Trip Sites for a Trip Step and include the sites
router.get(
  "/trips/:tripId/tripSteps/:tripStepId/tripSitesWithSites/",
  TripSite.findAllForTripStepWithSites
);

// Retrieve a single Trip Site with id
router.get(
  "/trips/:tripId/tripSites/:id",
  TripSite.findOne
);

// Update a Trip Site with id
router.put(
  "/trips/:tripId/tripSites/:id",
  authenticateRoute,
  TripSite.update
);

// Delete a Trip Site with id
router.delete(
  "/trips/:tripId/tripSites/:id",
  authenticateRoute,
  TripSite.delete
);

// Delete all Trip Sites
router.delete(
  "/tripSites/",
  authenticateRoute,
  TripSite.deleteAll
);

module.exports = router;
