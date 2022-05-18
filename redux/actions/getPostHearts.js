import {
  GET_POST_HEARTS_REQUEST,
  GET_POST_HEARTS_SUCCESS,
  GET_POST_HEARTS_ERROR,
} from "./constants";
import axios from "axios";
import { toast } from "react-toastify";

export const getPostHearts = (accountID) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_HEARTS_REQUEST });

    const url = `${process.env.ENDPOINT_SERVER}/api/v1/hearts/${accountID}`;
    const response = await axios.get(url);
    const responseBody = response.data;
    dispatch({
      type: GET_POST_HEARTS_SUCCESS,
      data: responseBody,
    });
  } catch (err) {
    dispatch({
      type: GET_POST_HEARTS_ERROR,
      message: err.response ? err.response.data.message : err,
    });
    if (err.response) {
      if (err.response.data.message.name === "TokenExpiredError") {
        toast.error("Tài khoản hết hạn! Vui lòng đăng nhập lại!");
        signOut();
      }
    }
  }
};
