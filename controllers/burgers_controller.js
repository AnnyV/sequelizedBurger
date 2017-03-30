var express = require("express");
var models  = require('../models');
var router = express.Router();

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
  models.Burger.create({
    burger_name: req.body.burgerName,
    devoured: false 
    }).then(function() {
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