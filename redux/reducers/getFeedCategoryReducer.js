import { GET_FEED_CATEGORY } from "../actions/constants";
const initialState = "all";
const getFeedCategoryReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_FEED_CATEGORY:
      return payload.data;
    default:
      return state;
  }
};
export default getFeedCategoryReducer;
