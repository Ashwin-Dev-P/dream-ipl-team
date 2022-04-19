//Modules
const mongoose = require("mongoose");

//Models

const TeamModel = mongoose.model("team");

const get_teams_repository = async () => {
  const select = "-__v -updatedAt";
  const teams = await TeamModel.find()
    .select(select)
    .populate("players_ids")
    .lean();

  return teams;
};

const get_team_by_user_id_repository = async (user_id) => {
  const filter = {
    user_id: user_id,
  };
  const my_team = await TeamModel.findOne(filter)
    .populate("players_ids")
    .sort({ created_at: -1 })
    .lean();
  return my_team;
};

const post_team_repository = async (players_ids) => {
  var team_object = new TeamModel();

  team_object.players_ids = players_ids;

  var result;
  try {
    team_object.save();
    result = {
      message: "Team created successfully",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    result = {
      message: "Unable to create team",
      status: 500,
      error,
    };
  }
  return result;
};

module.exports = {
  get_teams_repository,
  post_team_repository,
  get_team_by_user_id_repository,
};
