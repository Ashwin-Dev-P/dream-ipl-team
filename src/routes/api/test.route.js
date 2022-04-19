const express = require("express");
const router = express.Router();

//routes
router.get("/", async (req, res) => {
  return res.json({
    message: "Hello world",
  });
});

module.exports = router;
