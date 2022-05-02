import { GET_TOGGLE_BANNED } from "../actions/constants";
const initialState = {
  on: false,
};
const getToggleBannedReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_TOGGLE_BANNED:
      return {
        ...state,
        on: payload.data,
      };
    default:
      return state;
  }
};
export default getToggleBannedReducer;
