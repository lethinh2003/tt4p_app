import {
  ADD_ITEM_POST_SAVED,
  SET_POST_SAVED,
  REMOVE_ITEM_POST_SAVED,
} from "../actions/constants";
const initialState = [];
const _postSavedReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_POST_SAVED:
      return payload.data;

    case ADD_ITEM_POST_SAVED:
      if (state.includes(payload.data)) {
        return state;
      }

      return [...state, payload.data];
    case REMOVE_ITEM_POST_SAVED:
      const newState = state.filter((item, i) => item._id !== payload.data);

      return newState;
    default:
      return state;
  }
};
export default _postSavedReducer;
