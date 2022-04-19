//Modules
const mongoose = require("mongoose");

//Models
const PlayerModel = mongoose.model("player");

const get_player_by_id_repository = async (_id) => {
  const player = await PlayerModel.findById(_id).lean();

  return player;
};

const get_all_players_repository = async () => {
  const players = await PlayerModel.find().lean();

  return players;
};

const post_player_repository = async (
  foreigner,
  name,
  value,
  category,
  team_id,
  image_id
) => {
  console.log("idi", image_id);
  var player_object = new PlayerModel();
  player_object.foreigner = foreigner;
  player_object.name = name;
  player_object.value = value;
  player_object.category = category;
  player_object.team_id = team_id;
  player_object.image_id = image_id;

  var result;
  try {
    player_object.save();
    result = {
      message: "Player saved",
      status: 200,
    };
  } catch (error) {
    result = {
      message: "Unabel to save player",
      status: 500,
      error,
    };
  }
  return result;
};

module.exports = {
  get_player_by_id_repository,
  post_player_repository,
  get_all_players_repository,
};
