import { SET_AVATAR_USER, UPDATE_AVATAR_USER } from "../actions/constants";
const initialState = {};
const _avatarChangeReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_AVATAR_USER:
      return { ...state, ...payload.data };
    case UPDATE_AVATAR_USER:
      return { ...state, ...payload.data };

    default:
      return state;
  }
};
export default _avatarChangeReducer;
