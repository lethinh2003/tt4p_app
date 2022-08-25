import {
  SET_POST_ACTIVITY,
  ADD_ITEM_POST_ACTIVITY,
} from "../actions/constants";
const initialState = [];
const _postActivityReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_POST_ACTIVITY:
      return payload.data;
    case ADD_ITEM_POST_ACTIVITY:
      const convertArray = [payload.data];
      return [...convertArray, ...state];
    default:
      return state;
  }
};
export default _postActivityReducer;
