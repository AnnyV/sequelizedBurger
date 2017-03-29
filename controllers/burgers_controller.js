var express = require("express");
var models  = require('../models');
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  models.Burger.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.create(["burger_name", "devoured"], 
    [req.body.burgerName, false], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {

  models.Burger.update({

    devoured: true

  },

  {

    where: { id : req.params.id }

  }
  ).then(function() {

     res.redirect("/");
  });

});



// Export routes for server.js to use.
module.exports = router;