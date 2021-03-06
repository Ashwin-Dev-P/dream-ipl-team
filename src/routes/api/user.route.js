const express = require("express");
const router = express.Router();

//controllers
const user_controllers = require("../../controllers/user.controller");

//routes
router.post("/login", user_controllers.login_user_controller);

//register route
router.post("/", user_controllers.register_user_controller);

//logout
router.get("/logout", user_controllers.logout_controller);

module.exports = router;
