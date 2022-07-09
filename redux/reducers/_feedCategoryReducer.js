import { GET_FEED_CATEGORY, SET_FEED_CATEGORY } from "../actions/constants";
const initialState = "all";
const _feedCategoryReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_FEED_CATEGORY:
      return payload.data;
    case GET_FEED_CATEGORY:
      return payload.data;
    default:
      return state;
  }
};
export default _feedCategoryReducer;
