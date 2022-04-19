const player_repositories = require("../repositories/player.repository");

const post_player_service = async (
  foreigner,
  name,
  value,
  category,
  team_id,
  image_id
) => {
  const result = await player_repositories.post_player_repository(
    foreigner,
    name,
    value,
    category,
    team_id,
    image_id
  );

  return result;
};

module.exports = {
  post_player_service,
};
