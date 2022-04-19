import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";

//import redux
import { connect } from "react-redux";

//actions
import getAllPlayersAction from "../../redux/actions/players/getAllPlayers.action";
import confirmTeamAction from "../../redux/actions/players/createTeam.action";
//import components
import MyButton from "../shared/MyButton";
import Loading from "../shared/Loading";

import { config } from "../../config/index";
const configData = config();
const backend_url = configData.backend_url;

//const image = require("ass");

const removeObject = (arr, obj) => {
  var return_arr = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== obj) {
      return_arr.push(arr[i]);
    }
  }

  return return_arr;
};

const mapDispatchToProps = (dispatch) => ({
  getAllPlayersAction: () => {
    dispatch(getAllPlayersAction());
  },

  confirmTeamAction: (form_data) => {
    dispatch(confirmTeamAction(form_data));
  },
});

class index extends Component {
  constructor(props) {
    super(props);

    this.selectPlayer = this.selectPlayer.bind(this);
    this.confirmTeam = this.confirmTeam.bind(this);

    this.state = {
      players_selected: [],
      budget: 50,
    };
  }

  componentDidMount() {
    this.props.getAllPlayersAction();
  }

  selectPlayer(player) {
    var players_selected = this.state.players_selected;
    var budget = this.state.budget;
    if (!players_selected.includes(player)) {
      players_selected.push(player);
      budget = budget - player.value;
    } else {
      //players_selected.pop(player);

      players_selected = removeObject(players_selected, player);
      budget = budget + player.value;
    }
    this.setState({
      players_selected,
      budget,
    });
  }

  confirmTeam(e) {
    e.preventDefault();

    var ids = [];
    for (var index = 0; index < this.state.players_selected.length; index++) {
      ids.push(this.state.players_selected[index]._id);
    }
    const form_data = {
      players_ids: ids,
    };

    console.log("Selected players:", form_data);
    //alert(this.state.players_selected);
    this.props.confirmTeamAction(form_data);
  }

  render() {
    var { loading } = this.props.getAllPlayersReducer.status;
    if (this.props.getAllPlayersReducer.status.error === true) {
      var { error_message } = this.props.getAllPlayersReducer.status;
    }

    var { players } = this.props.getAllPlayersReducer;

    var form_error = this.props.postTeamReducer.status.error_message;
    var form_loading = this.props.postTeamReducer.status.loading;
    var message = this.props.postTeamReducer.status.message;
    //console.log(this.props);

    return (
      <div>
        <h2 className="text-center">Select team</h2>

        <div className="text-center">
          Players selected:{this.state.players_selected.length}
          <br />
          Budget left:{this.state.budget}
          <hr />
        </div>

        <div className="text-center">
          {this.state.players_selected.map((player, index) => (
            <div key={player._id} className="text-left">
              {index + 1}){player.name}
            </div>
          ))}
        </div>
        <div className="justify-content-center row">
          <div className="col-xs-12 col-md-6 col-lg-4 text-center">
            <form onSubmit={this.confirmTeam} className="text-center">
              <div className="text-center">
                <hr />
                <MyButton
                  text="Confirm team"
                  type="submit"
                  className="btn btn-primary"
                />
              </div>

              {form_error ? (
                <div className="error-message">{form_error}</div>
              ) : null}
              {message ? (
                <div className="text-center success-div">{message}</div>
              ) : null}
              {form_loading ? (
                <div className="text-center">
                  {" "}
                  <Loading />{" "}
                </div>
              ) : null}
            </form>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <Loading />
          </div>
        ) : (
          <div className="row">
            {players &&
              players.map((player) => (
                <div
                  key={player._id}
                  className="col-xs-12 col-md-6 col-lg-4  mt-3 mb-3 "
                >
                  <div className="player-div my-border p-3">
                    <div>
                      <img
                        src={
                          player.image_id
                            ? `${backend_url}/api/player/get_image/${player.image_id}`
                            : "../../assets/images/player.png"
                        }
                      />
                    </div>
                    <h3>{player.name}</h3>
                    <div>{player.category}</div>
                    <div>Value={player.value}</div>
                    <div>{player.foreigner ? <b>Foreigner</b> : null}</div>
                    <div className="text-center">
                      <MyButton
                        onClick={() => this.selectPlayer(player)}
                        text={
                          this.state.players_selected.includes(player)
                            ? "selected"
                            : "select"
                        }
                        className={
                          this.state.players_selected.includes(player)
                            ? "btn btn-secondary my-full-width "
                            : "btn btn-primary my-full-width"
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAllPlayersReducer: state.getAllPlayersReducer,
    loggedIn: state.logoutReducer.loggedIn,

    postTeamReducer: state.postTeamReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
