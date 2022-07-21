import { SET_FEED_POSTS, ADD_FEED_POSTS } from "../actions/constants";
const initialState = [];
const _feedPostsReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_FEED_POSTS:
      return payload.data;
    case ADD_FEED_POSTS:
      return [...state, ...payload.data];

    default:
      return state;
  }
};
export default _feedPostsReducer;
