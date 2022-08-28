import { SET_STATUS_CHAT_RANDOM } from "../actions/constants";
const initialState = "";
const _statusRandomChatReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_STATUS_CHAT_RANDOM:
      return payload.data;
    default:
      return state;
  }
};
export default _statusRandomChatReducer;
