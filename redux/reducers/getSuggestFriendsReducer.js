import {
  GET_SUGGEST_FRIEND_REQUEST,
  GET_SUGGEST_FRIEND_SUCCESS,
  GET_SUGGEST_FRIEND_ERROR,
} from "../actions/constants";

// khởi tạo một init state
const initialState = {
  requesting: false,
  success: false,
  error: false,
  message: null,
  data: null,
};

// bắt từng action type
function getSuggestFriendsReducer(state = initialState, payload) {
  switch (payload.type) {
    case GET_SUGGEST_FRIEND_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case GET_SUGGEST_FRIEND_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: false,
        data: payload.data,
      };
    case GET_SUGGEST_FRIEND_ERROR:
      return {
        ...state,
        requesting: false,
        success: false,

        error: true,
        message: payload.message,
      };

    default:
      return state;
  }
}

export default getSuggestFriendsReducer;
