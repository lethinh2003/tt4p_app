import { SET_POST_ACTIVITY } from "../actions/constants";
const initialState = null;
const _postActivityReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_POST_ACTIVITY:
      return payload.data;
    default:
      return state;
  }
};
export default _postActivityReducer;
