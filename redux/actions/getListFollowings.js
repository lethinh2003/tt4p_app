import { GET_LIST_FOLLOWINGS } from "./constants";
export const getListFollowings = (value) => (dispatch) => {
  dispatch({
    type: GET_LIST_FOLLOWINGS,
    data: value,
  });
};
