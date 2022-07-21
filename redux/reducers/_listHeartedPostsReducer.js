import {
  ADD_ITEM_LIST_HEARTED_POSTS,
  SET_LIST_HEARTED_POSTS,
  GET_LIST_HEARTED_POSTS,
  REMOVE_ITEM_LIST_HEARTED_POSTS,
} from "../actions/constants";
const initialState = [];
const _listHeartedPostsReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_LIST_HEARTED_POSTS:
      return payload.data;
    case GET_LIST_HEARTED_POSTS:
      if (state.includes(payload.data)) {
        return state;
      }

      return [...state, payload.data];
    case ADD_ITEM_LIST_HEARTED_POSTS:
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
export default _listHeartedPostsReducer;
