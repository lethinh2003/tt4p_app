import { GET_LIST_COMMENTS_LOADING } from "./constants";
export const getListCommentsLoading = (value) => (dispatch) => {
  dispatch({
    type: GET_LIST_COMMENTS_LOADING,
    data: value,
  });
};
