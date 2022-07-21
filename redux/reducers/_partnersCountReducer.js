import {
  SET_PARTNERS_COUNT,
  GET_PARTNERS_COUNT,
  INC_PARTNERS_COUNT,
  DEC_PARTNERS_COUNT,
} from "../actions/constants";
const initialState = 0;
const _partnersCountReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_PARTNERS_COUNT:
      return payload.data;
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
export default _partnersCountReducer;
