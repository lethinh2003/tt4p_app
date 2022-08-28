export const _statusRandomChat = (payload) => (dispatch) => {
  dispatch({
    type: payload.type,
    data: payload.data,
  });
};
