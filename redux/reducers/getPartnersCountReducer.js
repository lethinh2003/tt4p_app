import {
  GET_PARTNERS_COUNT,
  INC_PARTNERS_COUNT,
  DEC_PARTNERS_COUNT,
} from "../actions/constants";
const initialState = 0;
const getPartnersCountReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_PARTNERS_COUNT:
      return payload.data;
    case INC_PARTNERS_COUNT:
      return state + payload.data;
    case DEC_PARTNERS_COUNT:
      return state - payload.data;
    default:
      return state;
  }
};
export default getPartnersCountReducer;
