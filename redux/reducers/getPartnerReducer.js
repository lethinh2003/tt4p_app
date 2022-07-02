import { GET_PARTNER } from "../actions/constants";
const initialState = null;
const getPartnerReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_PARTNER:
      return payload.data;
    default:
      return state;
  }
};
export default getPartnerReducer;
