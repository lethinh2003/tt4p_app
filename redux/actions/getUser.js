import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "./constants";
import axios from "axios";
export const getUser = (account) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const url = `${process.env.ENDPOINT_SERVER}/api/v1/users`;
    const response = await axios.post(url, {
      account: account,
    });
    const responseBody = response.data;
    dispatch({
      type: GET_USER_SUCCESS,
      data: responseBody,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ERROR,
      message: err.response ? err.response.data.message : err,
    });
  }
};
