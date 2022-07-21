import {
  ADD_ITEM_LIST_FOLLOWINGS,
  SET_LIST_FOLLOWINGS,
  GET_LIST_FOLLOWINGS,
  REMOVE_ITEM_LIST_FOLLOWINGS,
} from "../actions/constants";
const initialState = [];
const _listFollowingsReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_LIST_FOLLOWINGS:
      return payload.data;
    case GET_LIST_FOLLOWINGS:
      if (state.includes(payload.data)) {
        return state;
      }

      return [...state, payload.data];
    case ADD_ITEM_LIST_FOLLOWINGS:
      if (state.includes(payload.data)) {
        return state;
      }

      return [...state, payload.data];
    case REMOVE_ITEM_LIST_FOLLOWINGS:
      const newState = state.filter((item, i) => item !== payload.data);

      return newState;
    default:
      return state;
  }
};
export default _listFollowingsReducer;
