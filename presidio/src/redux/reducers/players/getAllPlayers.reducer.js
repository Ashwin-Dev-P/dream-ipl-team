import {
  GET_ALL_PLAYERS_LOADING,
  GET_ALL_PLAYERS_SUCCESS,
} from "../../actions/types";
//import { LOGIN_FAILED, LOGIN_LOADING, LOGIN_SUCCESS } from "../actions/types";

const initialState = {
  players: [],
  status: {
    loading: false,
  },
};

function getAllPlayersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PLAYERS_LOADING:
      return {
        ...state,

        status: {
          loading: true,
          error: false,
        },
      };

    case GET_ALL_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.payload.players,
        status: {
          loading: false,
          error: false,
        },
      };

    default:
      return state;
  }
}

export default getAllPlayersReducer;
