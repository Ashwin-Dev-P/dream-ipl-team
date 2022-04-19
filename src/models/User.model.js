const mongoose = require("mongoose");
const constants = require("../constants/constants");
const PASSWORD_MIN_REQUIRED_LENGTH = constants.PASSWORD_MIN_REQUIRED_LENGTH;

var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 320,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: PASSWORD_MIN_REQUIRED_LENGTH,
    },
    first_name: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
    },
    last_name: {
      type: String,
      trim: true,
      required: false,
      minlength: 0,
    },

    budget: {
      type: Number,
      required: true,
      max: 50,
      min: 0,
      default: 50,
    },

    points: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    team_id: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("user", userSchema);
