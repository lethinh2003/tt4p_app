import {
  SET_FEED_CURRENT_PAGE,
  INC_FEED_CURRENT_PAGE,
} from "../actions/constants";
const initialState = 1;
const _feedCurrentPageReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_FEED_CURRENT_PAGE:
      return payload.data;
    case INC_FEED_CURRENT_PAGE:
      return state + 1;

    default:
      return state;
  }
};
export default _feedCurrentPageReducer;
