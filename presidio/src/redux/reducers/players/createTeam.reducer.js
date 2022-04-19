import {
  POST_TEAM_LOADING,
  POST_TEAM_SUCCESS,
  POST_TEAM_FAILED,
} from "../../actions/types";
//import { LOGIN_FAILED, LOGIN_LOADING, LOGIN_SUCCESS } from "../actions/types";

const initialState = {
  status: {
    loading: false,
    error_message: null,
  },
};

function postTeamReducer(state = initialState, action) {
  switch (action.type) {
    case POST_TEAM_LOADING:
      return {
        ...state,

        status: {
          loading: true,
          error_message: false,
        },
      };

    case POST_TEAM_SUCCESS:
      return {
        ...state,

        status: {
          message: action.payload.message,
          loading: false,
          error: false,
        },
      };

    case POST_TEAM_FAILED:
      return {
        ...state,
        status: {
          error_message: action.payload.message,
          loading: false,
        },
      };

    default:
      return state;
  }
}

export default postTeamReducer;
