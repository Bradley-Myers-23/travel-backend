module.exports = (app) => {
    const UserType = require("../controllers/userType.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new userType
    router.post("/userTypes/", [authenticateRoute], UserType.create);
  
    // Retrieve all userTypes
    router.get("/userTypes/", UserType.findAll);
  
    // Retrieve a single userType with userTypeId
    router.get("/userTypes/:id", UserType.findOne);
  
    // Update an userType with userTypeId
    router.put("/userTypes/:id", [authenticateRoute], UserType.update);
  
    // Delete an userType with userTypeId
    router.delete("/userTypes/:id", [authenticateRoute], UserType.delete);
  
    // Delete all userTypes
    router.delete("/userTypes/", [authenticateRoute], UserType.deleteAll);
  
    app.use("/travelapi", router);
  };
  