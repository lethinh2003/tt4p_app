export const _messagesCount = (payload) => (dispatch) => {
  dispatch({
    type: payload.type,
    data: payload.data,
  });
};
