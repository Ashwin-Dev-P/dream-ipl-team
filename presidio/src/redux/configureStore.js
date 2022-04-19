import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";

//reducer
import testReducer from "./reducers/test.reducer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      testReducer: testReducer,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
