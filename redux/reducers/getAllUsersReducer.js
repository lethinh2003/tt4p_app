import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
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
function getAllUsersReducer(state = initialState, payload) {
  switch (payload.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: false,
        data: payload.data,
      };
    case GET_ALL_USERS_ERROR:
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

export default getAllUsersReducer;
