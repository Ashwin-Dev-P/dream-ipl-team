import React, { Component } from "react";
import MyButton from "../shared/MyButton";

import MyTeam from "../my_team/index";

import axios from "axios";

import Loading from "../shared/Loading";
//config
import { config } from "../../config/index";
const configData = config();
const backend_url = configData.backend_url;

export default class index extends Component {
  constructor(props) {
    super(props);

    this.start_match = this.start_match.bind(this);

    this.state = {
      result: null,
      loading: false,
    };
  }

  start_match() {
    this.setState({
      loading: true,
    });
    const url = backend_url + "/api/team/start_match";

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
            result: response.data,
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
  componentDidMount() {}
  render() {
    const { loading, result } = this.state;
    return (
      <div>
        <div className="text-center">
          {loading ? (
            <Loading />
          ) : (
            <div className="text-center ">
              {result ? (
                <div className="row mt-3 m-3">
                  <div className="col-xs-12 col-md-6 my-border shadow-sm">
                    Your team:( {result.runs_scored}/{result.wickets_lost} )
                    <hr />
                    <br />
                    Runs scored : {result.runs_scored}
                    <br />
                    Wickets taken: {result.wickets_taken}
                    <br />
                    <hr />
                    Total score: {result.points_scored}
                  </div>
                  <div className="col-xs-12 col-md-6 my-border shadow-sm">
                    Opponent team:({result.runs_given}/{result.wickets_taken})
                    <hr />
                    <br />
                    Runs scored : {result.runs_given}
                    <br />
                    Wickets taken: {result.wickets_lost}
                  </div>
                  {result.runs_scored > result.runs_given ? (
                    <div className="success-div mt-3">
                      You won the match(+10 points)
                    </div>
                  ) : (
                    <div className="error-message mt-3">You lost the match</div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          <MyButton
            text={result ? "next match" : "start match"}
            className="btn btn-primary mt-3 mb-3"
            onClick={this.start_match}
          />
        </div>
        <MyTeam />
      </div>
    );
  }
}
