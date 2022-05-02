import { GET_TOGGLE_ABOUT_ME } from "./constants";
export const getToggleAboutMe = (value) => (dispatch) => {
  dispatch({
    type: GET_TOGGLE_ABOUT_ME,
    data: value,
  });
};
