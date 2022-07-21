export const _avatarChange = (payload) => (dispatch) => {
  dispatch({
    type: payload.type,
    data: payload.data,
  });
};
