import { GET_USERS_ONLINE } from "../actions/constants";
const initialState = [];
const getUsersOnlineReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_USERS_ONLINE:
      return payload.data;
    default:
      return state;
  }
};
export default getUsersOnlineReducer;
