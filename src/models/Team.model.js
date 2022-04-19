const mongoose = require("mongoose");

var teamSchema = new mongoose.Schema(
  {
    players_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "player",
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("team", teamSchema);
