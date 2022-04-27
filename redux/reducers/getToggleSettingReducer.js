import { GET_TOGGLE_SETTING } from "../actions/constants";
const initialState = {
  on: false,
};
const getToggleSettingReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_TOGGLE_SETTING:
      return {
        ...state,
        on: payload.data,
      };
    default:
      return state;
  }
};
export default getToggleSettingReducer;
