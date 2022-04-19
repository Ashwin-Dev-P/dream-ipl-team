const mongoose = require("mongoose");

var playerSchema = new mongoose.Schema(
  {
    foreigner: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
    },

    value: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
    },

    team_id: {
      type: mongoose.Types.ObjectId,
      ref: "team",
      required: false,
    },
    image_id: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("player", playerSchema);
