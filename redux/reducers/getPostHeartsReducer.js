import {
  GET_POST_HEARTS_REQUEST,
  GET_POST_HEARTS_SUCCESS,
  GET_POST_HEARTS_ERROR,
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
function getPostHeartsReducer(state = initialState, payload) {
  switch (payload.type) {
    case GET_POST_HEARTS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case GET_POST_HEARTS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: false,
        data: payload.data,
      };
    case GET_POST_HEARTS_ERROR:
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

export default getPostHeartsReducer;
