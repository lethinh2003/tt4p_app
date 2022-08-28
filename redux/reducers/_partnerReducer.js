import {
  GET_PARTNER_CHAT_RANDOM,
  SET_PARTNER_CHAT_RANDOM,
} from "../actions/constants";
const initialState = null;
const _partnerReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_PARTNER_CHAT_RANDOM:
      return payload.data;
    case SET_PARTNER_CHAT_RANDOM:
      return payload.data;
    default:
      return state;
  }
};
export default _partnerReducer;
