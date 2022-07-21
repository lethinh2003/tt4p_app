export const _postActivity = (payload) => (dispatch) => {
  dispatch({
    type: payload.type,
    data: payload.data,
  });
};
