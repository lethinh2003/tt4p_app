import { GET_MESSAGES_COUNT, INC_MESSAGES_COUNT } from "../actions/constants";
const initialState = 0;
const getMessagesCountReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_MESSAGES_COUNT:
      return payload.data;
    case INC_MESSAGES_COUNT:
      return state + payload.data;

    default:
      return state;
  }
};
export default getMessagesCountReducer;
