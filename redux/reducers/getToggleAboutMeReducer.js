import { GET_TOGGLE_ABOUT_ME } from "../actions/constants";
const initialState = {
  on: false,
};
const getToggleAboutMeReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_TOGGLE_ABOUT_ME:
      return {
        ...state,
        on: payload.data,
      };
    default:
      return state;
  }
};
export default getToggleAboutMeReducer;
