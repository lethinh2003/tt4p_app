import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
} from "./constants";
import axios from "axios";
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const url = `${process.env.ENDPOINT_SERVER}/api/v1/users/admin`;
    const response = await axios.get(url);
    const responseBody = response.data.data.users;
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      data: responseBody,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_USERS_ERROR,
      message: err.response ? err.response.data.message : err,
    });
  }
};
