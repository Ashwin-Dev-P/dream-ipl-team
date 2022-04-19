const express = require("express");
const router = express.Router();

//controller
const teams_controller = require("../../controllers/team.controller");

//utils
const jwtLoginAuthentication = require("../../utils/users/authentication/jwtLoginAuthentication");

//routes
router.get("/", teams_controller.get_teams_controller);

router.post("/", teams_controller.post_team_controller);

router.get("/my_team", teams_controller.get_team_by_user_id_controller);

router.get(
  "/start_match",
  jwtLoginAuthentication,
  teams_controller.start_match_controller
);

module.exports = router;
