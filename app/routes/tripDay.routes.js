module.exports = (app) => {
    const tripDay = require("../controllers/tripDay.controller.js");
    const { authenticateRoute } = require("../authentication/authentication");
    var router = require("express").Router();
  
    // Create a new trip Day for a trip
    router.post(
      "/trips/:tripId/tripDays/",
      [authenticateRoute],
      tripDay.create
    );
  
    // Retrieve all trip Days
    router.get("/tripDays/", tripDay.findAll);
  
    // Retrieve all trip Days for a trip
    router.get("/trips/:tripId/tripDays/", tripDay.findAllForTrip);
  
    /* Retrieve all trip Days for a trip and include the ingredients
    router.get(
      "/trips/:tripId/tripDaysWithIngredients/",
      tripDay.findAllFortripWithIngredients
    );*/
  
    // Retrieve a single trip Day with id
    router.get("/trips/:tripId/tripDays/:id", tripDay.findOne);
  
    // Update a trip Day with id
    router.put(
      "/trips/:tripId/tripDays/:id",
      [authenticateRoute],
      tripDay.update
    );
  
    // Delete a trip Day with id
    router.delete(
      "/trips/:tripId/tripDays/:id",
      [authenticateRoute],
      tripDay.delete
    );
  
    // Delete all trip Days
    router.delete("/tripDays/", [authenticateRoute], tripDay.deleteAll);
  
    app.use("/travelapi", router);
  };
  