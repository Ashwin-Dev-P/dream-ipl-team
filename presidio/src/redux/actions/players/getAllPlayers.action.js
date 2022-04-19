import { GET_ALL_PLAYERS_LOADING, GET_ALL_PLAYERS_SUCCESS } from "../types";

import axios from "axios";

//config
import { config } from "../../../config/index";
const configData = config();
const backend_url = configData.backend_url;

const getAllPlayersAction = (form_data) => {
  return async (dispatch) => {
    await dispatch({
      type: GET_ALL_PLAYERS_LOADING,
    });

    const url = backend_url + "/api/player";

    const headers = {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
    };
    await axios
      .get(url, headers)

      .then(async (response) => {
        //Axios check
        if (response.status === 200) {
          await dispatch({
            type: GET_ALL_PLAYERS_SUCCESS,
            payload: {
              players: response.data,
            },
          });
        }
      })
      .catch(async (error) => {
        console.error("Axios  error", error);
      });
  };
};

export default getAllPlayersAction;
