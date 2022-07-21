import {
  GET_SUGGEST_FRIEND_REQUEST,
  GET_SUGGEST_FRIEND_SUCCESS,
  GET_SUGGEST_FRIEND_ERROR,
} from "./constants";
import axios from "axios";
import { toast } from "react-toastify";

export const getSuggestFriends = (accountID) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUGGEST_FRIEND_REQUEST });

    const url = `${process.env.ENDPOINT_SERVER}/api/v1/users/suggestion-friends/${accountID}`;
    const response = await axios.get(url);
    const responseBody = response.data;
    dispatch({
      type: GET_SUGGEST_FRIEND_SUCCESS,
      data: responseBody,
    });
  } catch (err) {
    dispatch({
      type: GET_SUGGEST_FRIEND_ERROR,
      message: err.response ? err.response.data.message : err,
    });
    if (err.response) {
      // if (err.response.data.message.name === "TokenExpiredError") {
      //   toast.error("Tài khoản hết hạn! Vui lòng đăng nhập lại!");
      //   signOut();
      // }
    }
  }
};
