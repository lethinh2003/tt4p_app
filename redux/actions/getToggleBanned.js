import { GET_TOGGLE_BANNED } from "./constants";
export const getToggleBanned = (value) => (dispatch) => {
  dispatch({
    type: GET_TOGGLE_BANNED,
    data: value,
  });
};
