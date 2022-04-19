import React, { Component } from "react";

import axios from "axios";

import Loading from "../shared/Loading";
//config
import { config } from "../../config/index";
const configData = config();
const backend_url = configData.backend_url;

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error_message: null,
      players: [],
    };
  }
  componentDidMount() {
    const url = backend_url + "/api/team/my_team";

    const headers = {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
    };
    axios
      .get(url, headers)

      .then(async (response) => {
        //Axios check
        if (response.status === 200) {
          this.setState({
            players: response.data.players_ids,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.error("Axios  error", error);
        this.setState({
          error_message: error.message,
          loading: false,
        });
      });
  }
  render() {
    const { players, loading, error_message } = this.state;
    return (
      <div>
        <div className="text-center">
          <h2 className="my-heading">My Team</h2>
          {loading ? <Loading /> : null}
          {error_message ? (
            <div className="error-message">{error_message}</div>
          ) : null}
        </div>

        <div className="row">
          {players.map((player) => (
            <div
              key={player._id}
              className="col-xs-12 col-md-6 col-lg-4  mt-3 mb-3 "
            >
              <div className="player-div my-border p-3" key={player._id}>
                <h3>{player.name}</h3>
                <div>{player.category}</div>
                <div>Value={player.value}</div>
                <div>{player.foreigner ? <b>Foreigner</b> : null}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
