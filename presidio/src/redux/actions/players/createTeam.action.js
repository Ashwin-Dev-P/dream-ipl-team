import {
  POST_TEAM_FAILED,
  POST_TEAM_LOADING,
  POST_TEAM_SUCCESS,
} from "../types";

import axios from "axios";

//config
import { config } from "../../../config/index";
const configData = config();
const backend_url = configData.backend_url;

const createTeamAction = (form_data) => {
  return async (dispatch) => {
    await dispatch({
      type: POST_TEAM_LOADING,
    });

    const url = backend_url + "/api/team";

    const headers = {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
    };
    await axios
      .post(url, form_data, headers)

      .then(async (response) => {
        //Axios check
        console.log(response);
        if (response.status === 200) {
          if (response.data.status !== 200) {
            await dispatch({
              type: POST_TEAM_FAILED,
              payload: {
                message: response.data.message,
              },
            });
            return;
          } else {
            await dispatch({
              type: POST_TEAM_SUCCESS,
              payload: {
                message: response.data.message,
              },
            });
          }
        }
      })
      .catch(async (error) => {
        console.error("Axios  error", error);
        await dispatch({
          type: POST_TEAM_FAILED,
          payload: {
            message: error.message || "something went wrong",
          },
        });
      });
  };
};

export default createTeamAction;
