module.exports = (app) => {
    const trip = require("../controllers/trip.controller.js");
    const { authenticateRoute } = require("../authentication/authentication");
    var router = require("express").Router();
  
    // Create a new trip
    router.post("/trips/", [authenticateRoute], trip.create);
  
    // Retrieve all trips for user
    router.get(
      "/trips/user/:userId",
      [authenticateRoute],
      trip.findAllForUser
    );
  
    // Retrieve all published trips
    router.get("/trips/", trip.findAllPublished);
  
    // Retrieve a single trip with id
    router.get("/trips/:id", trip.findOne);
  
    // Update a trip with id
    router.put("/trips/:id", [authenticateRoute], trip.update);
  
    // Delete a trip with id
    router.delete("/trips/:id", [authenticateRoute], trip.delete);
  
    // Delete all trips
    router.delete("/trips/", [authenticateRoute], trip.deleteAll);
  
    app.use("/travelapi", router);
  };
  