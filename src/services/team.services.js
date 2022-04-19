//repository
const team_repositories = require("../repositories/team.repository");
const player_repository = require("../repositories/player.repository");

//utils
const isValidId = require("../utils/shared/isValidId");

//import servcies
const user_services = require("./user.services");

//services
const get_teams_service = async () => {
  const teams = await team_repositories.get_teams_repository();

  return teams;
};

const post_teams_service = async (player_ids) => {
  var result;

  if (!player_ids) {
    return (result = {
      message: "Please select players",
      status: 400,
    });
  }
  for (var i = 0; i < player_ids.length; i++) {
    if (!(await isValidId(player_ids[i]))) {
      result = {
        message: "Invalid player id",
        status: 400,
      };
      return result;
    }
  }

  //check player count
  if (player_ids.length !== 11) {
    console.log(player_ids);
    result = {
      message: "Select 11 players",
      status: 400,
    };

    return result;
  }

  //check player category
  var batsman = 0,
    bowler = 0,
    all_rounder = 0,
    total_value = 0;
  for (var index = 0; index < player_ids.length; index++) {
    const player = await player_repository.get_player_by_id_repository(
      player_ids[index]
    );

    const category = player.category;
    const value = player.value;

    total_value = value + total_value;
    console.log(value);

    if (category === "batsman") {
      batsman++;
    } else if (category === "bowler") {
      bowler++;
    } else if (category === "all rounder") {
      all_rounder++;
    }
  }

  console.log(total_value);
  if (total_value > 50) {
    result = {
      message: "You are exceeding the budget",
      status: 400,
    };
    return result;
  }

  if ((batsman !== 6) & (bowler !== 3) && all_rounder !== 2) {
    result = {
      message: "You should select 6 batsman , 2 bowlers and 2 all rounders",
      status: 200,
    };

    return result;
  }

  result = await team_repositories.post_team_repository(player_ids);
  return result;
};

const start_match_service = async (user_id) => {
  function generateRandom(maxLimit) {
    let rand = Math.random() * maxLimit;

    rand = Math.floor(rand);

    return rand;
  }

  const runs_scored = generateRandom(250);
  const wickets_lost = generateRandom(10);

  const runs_given = generateRandom(250);
  const wickets_taken = generateRandom(10);

  var lost;
  if (runs_scored < runs_given) {
    lost = true;
  } else {
    lost = false;
  }

  const points_scored = runs_scored + wickets_taken * 10;

  var result = {
    runs_scored,
    wickets_lost,
    runs_given,
    wickets_taken,
    points_scored,
  };

  console.log(points_scored, "here");

  const update_score_result = await user_services.update_score_service(
    user_id,
    points_scored
  );
  console.log(update_score_result);

  return result;
};

module.exports = {
  get_teams_service,
  post_teams_service,
  start_match_service,
};
