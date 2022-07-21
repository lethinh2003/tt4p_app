import { GET_PARTNER, SET_PARTNER } from "../actions/constants";
const initialState = null;
const _partnerReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_PARTNER:
      return payload.data;
    case SET_PARTNER:
      return payload.data;
    default:
      return state;
  }
};
export default _partnerReducer;
