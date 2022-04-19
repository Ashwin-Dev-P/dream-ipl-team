import { TEST } from "../actions/types";

const initialState = {};

function testReducer(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        message: "hello",
      };

    default:
      return state;
  }
}

export default testReducer;
