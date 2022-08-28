import {
  SET_MESSAGES_CHAT_RANDOM,
  INSERT_MESSAGE_CHAT_RANDOM,
} from "../actions/constants";
const initialState = [];
const _messagesRandomChatReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_MESSAGES_CHAT_RANDOM:
      return payload.data;
    case INSERT_MESSAGE_CHAT_RANDOM:
      return [...state, payload.data];
    default:
      return state;
  }
};
export default _messagesRandomChatReducer;
