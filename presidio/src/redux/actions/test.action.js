import { TEST } from "./types";

const testAction = () => {
  return async (dispatch) => {
    await dispatch({
      type: TEST,
    });
  };
};

export default testAction;
