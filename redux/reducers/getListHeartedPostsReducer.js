import {
  GET_LIST_HEARTED_POSTS,
  REMOVE_ITEM_LIST_HEARTED_POSTS,
} from "../actions/constants";
const initialState = [];
const getListHeartedPostsReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_LIST_HEARTED_POSTS:
      if (state.includes(payload.data)) {
        return state;
      }

      return [...state, payload.data];
    case REMOVE_ITEM_LIST_HEARTED_POSTS:
      const newState = state.filter((item, i) => item !== payload.data);

      return newState;
    default:
      return state;
  }
};
export default getListHeartedPostsReducer;
