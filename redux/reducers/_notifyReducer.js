import { SET_NOTIFY_NUMBER, INC_NOTIFY_NUMBER } from "../actions/constants";
const initialState = 0;
const _notifyReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_NOTIFY_NUMBER:
      return payload.data;
    case INC_NOTIFY_NUMBER:
      return state + payload.data;

    default:
      return state;
  }
};
export default _notifyReducer;
