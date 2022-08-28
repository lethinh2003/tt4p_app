export const _messagesRandomChat = (payload) => (dispatch) => {
  dispatch({
    type: payload.type,
    data: payload.data,
  });
};
