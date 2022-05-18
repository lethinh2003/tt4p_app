import {
  GET_POST_ACTIVITY_REQUEST,
  GET_POST_ACTIVITY_SUCCESS,
  GET_POST_ACTIVITY_ERROR,
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
function getPostActivityReducer(state = initialState, payload) {
  switch (payload.type) {
    case GET_POST_ACTIVITY_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case GET_POST_ACTIVITY_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: false,
        data: payload.data,
      };
    case GET_POST_ACTIVITY_ERROR:
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

export default getPostActivityReducer;
