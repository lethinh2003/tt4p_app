import { GET_DARKMODE, SET_DARKMODE } from "../actions/constants";
const initialState = {
  on: false,
};
const _darkModeReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_DARKMODE:
      return {
        ...state,
        on: payload.data,
      };
    case GET_DARKMODE:
      return {
        ...state,
        on: payload.data,
      };
    default:
      return state;
  }
};
export default _darkModeReducer;
