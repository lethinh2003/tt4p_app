import {
  GET_LIST_COMMENTS_LOADING,
  ADD_ITEM_LIST_COMMENTS_LOADING,
  REMOVE_ITEM_LIST_COMMENTS_LOADING,
} from "../actions/constants";
const initialState = [];
const _listCommentsLoadingReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case REMOVE_ITEM_LIST_COMMENTS_LOADING:
      if (state.includes(payload.data)) {
        state.splice(state.indexOf(payload.data), 1);
        return [...state];
      }
      return state;
    case ADD_ITEM_LIST_COMMENTS_LOADING:
      return [...state, payload.data];
    default:
      return state;
  }
};
export default _listCommentsLoadingReducer;
