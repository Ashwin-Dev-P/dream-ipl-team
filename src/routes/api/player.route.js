const express = require("express");
const router = express.Router();

//image upload
const { upload } = require("../../models/db");

//controllers
const player_controllers = require("../../controllers/player.controller");
const { isValidObjectId } = require("mongoose");

//register route
router.post(
  "/",
  upload.single("image"),
  player_controllers.post_player_controller
);

router.get(
  "/get_image/:image_id",
  (req, res, next) => {
    if (!isValidObjectId(req.params.image_id)) {
      return res.json({
        message: "Enter a valid image id",
      });
    }
    next();
  },
  player_controllers.get_image_controller
);

//get players route
router.get("/", player_controllers.get_all_players_controller);

module.exports = router;
