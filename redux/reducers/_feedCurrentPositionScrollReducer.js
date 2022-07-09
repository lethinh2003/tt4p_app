import { SET_FEED_CURRENT_POSITION_SCROLL } from "../actions/constants";
const initialState = 0;
const _feedCurrentPositionScrollReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_FEED_CURRENT_POSITION_SCROLL:
      return payload.data;

    default:
      return state;
  }
};
export default _feedCurrentPositionScrollReducer;
