import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";

//reducer
import testReducer from "./reducers/test.reducer";
import loginReducer from "./reducers/login.reducer";
import registerReducer from "./reducers/register.reducer";
import logoutReducer from "./reducers/logout.reducer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      testReducer: testReducer,
      loginReducer: loginReducer,
      registerReducer: registerReducer,
      logoutReducer: logoutReducer,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
