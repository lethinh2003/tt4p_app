import { GET_USERS_ONLINE, SET_LIST_USERS_ONLINE } from "../actions/constants";
const initialState = [];
const _listUsersOnlineReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_LIST_USERS_ONLINE:
      return payload.data;
    default:
      return state;
  }
};
export default _listUsersOnlineReducer;
