export const getListHeartedPosts = (payload) => (dispatch) => {
  dispatch({
    type: payload.type,
    data: payload.data,
  });
};