module.exports = (app) => {
    const Trip = require("../controllers/trip.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Trip
    router.post("/trips", authenticateRoute, Trip.create);
  
    // Retrieve all Trips
    router.get("/trips", authenticateRoute, Trip.findAll);
  
    // Retrieve a single Trip with tripId
    router.get("/trips/:id", authenticateRoute, Trip.findOne);
  
    // Update a Trip with tripId
    router.put("/trips/:id", authenticateRoute, Trip.update);
  
    // Delete a Trip with tripId
    router.delete("/trips/:id", authenticateRoute, Trip.delete);
  
    // Delete all Trips
    router.delete("/trips", authenticateRoute, Trip.deleteAll);
  
    app.use("travelapi", router);
  };
  