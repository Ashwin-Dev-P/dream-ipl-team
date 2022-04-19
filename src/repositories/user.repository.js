//Modules
const mongoose = require("mongoose");

//Models

const UserModel = mongoose.model("user");

const createUser = async (email, hashed_password, first_name, last_name) => {
  const user = new UserModel();

  //user.validate();

  user.first_name = first_name;
  user.last_name = last_name;
  user.password = hashed_password;
  user.email = email;

  //Used to validate data using schema
  /*
  const err = await user.validateSync();
  console.log(err);
  */

  console.time("\nUser save time");
  await user.save();
  console.timeEnd("\nUser save time");

  delete user.password;
  return user;
};

//Used for login
const get_user_by_email_repository = async (email) => {
  const filter = {
    email: email,
  };
  const user = await UserModel.findOne(filter).select("id email password");
  return user;
};

const update_score_repository = async (user_id, score) => {
  const user = await UserModel.findById(user_id).select("points_scored").lean();
  console.log("fetched user", user);
  const points_scored = user.points_scored + score;
  const update = {
    points_scored,
    points: points_scored,
  };

  const updateResult = await UserModel.findByIdAndUpdate(
    user_id,
    update
  ).lean();
  console.log("updated result:", updateResult);
  return updateResult;
};

module.exports = {
  createUser,
  get_user_by_email_repository,
  update_score_repository,
};
