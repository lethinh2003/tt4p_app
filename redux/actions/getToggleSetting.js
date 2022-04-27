import { GET_TOGGLE_SETTING } from "./constants";
export const getToggleSetting = (value) => (dispatch) => {
  dispatch({
    type: GET_TOGGLE_SETTING,
    data: value,
  });
};
