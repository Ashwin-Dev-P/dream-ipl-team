const express = require("express");
const router = express.Router();

//import controller
const shared_controllers = require("../../controllers/shared.controller");

//import routes
const test_routes = require("./test.route");
const user_routes = require("./user.route");
const teams_routes = require("./team.route");
const player_routes = require("./player.route");

router.use("/test", test_routes);
router.use("/user", user_routes);
router.use("/team", teams_routes);
router.use("/player", player_routes);

//Method or route not found
router.all("*", shared_controllers.method_not_found_controller);

module.exports = router;
