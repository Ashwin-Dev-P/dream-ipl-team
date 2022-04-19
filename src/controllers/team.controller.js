//services
const team_services = require("../services/team.services");

//repositories
const team_repositries = require("../repositories/team.repository");

const get_teams_controller = async (req, res) => {
  const teams = await team_services.get_teams_service();

  return res.json(teams);
};

const post_team_controller = async (req, res) => {
  const { players_ids } = req.body;
  const final_result = await team_services.post_teams_service(players_ids);

  return res.json(final_result);
};

const get_team_by_user_id_controller = async (req, res) => {
  const { user_id } = req.body;

  const final_result = await team_repositries.get_team_by_user_id_repository(
    user_id
  );
  return res.json(final_result);
};

const start_match_controller = async (req, res) => {
  const { user_id } = req.body;
  const final_result = await team_services.start_match_service(user_id);
  return res.json(final_result);
};

module.exports = {
  get_teams_controller,
  post_team_controller,
  get_team_by_user_id_controller,
  start_match_controller,
};
