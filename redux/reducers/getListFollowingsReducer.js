import { GET_LIST_FOLLOWINGS } from "../actions/constants";
const initialState = [];
const getListFollowingsReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_LIST_FOLLOWINGS:
      return [...state, ...payload.data];
    default:
      return state;
  }
};
export default getListFollowingsReducer;
