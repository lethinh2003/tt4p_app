import {
  SET_POST_COMMENTS,
  INSERT_POST_COMMENTS,
  CREATE_POST_COMMENTS,
  DELETE_POST_COMMENTS,
} from "../actions/constants";
const initialState = [];
let newData = [];
const setPostCommentsReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_POST_COMMENTS:
      return payload.data;
    case INSERT_POST_COMMENTS:
      newData = [];
      payload.data.forEach((item) => {
        if (checkIsExistComment(item, state) === false) {
          newData.push(item);
        }
      });
      return [...state, ...newData];
    case CREATE_POST_COMMENTS:
      newData = [];
      payload.data.forEach((item) => {
        if (checkIsExistComment(item, state) === false) {
          newData.push(item);
        }
      });
      return [...newData, ...state];
    case DELETE_POST_COMMENTS:
      const newComments = state.filter((item) => item._id != payload.data._id);

      return newComments;
    default:
      return state;
  }
};
export default setPostCommentsReducer;
const checkIsExistComment = (comment, array) => {
  let check = false;
  for (let i = 0; i < array.length; i++) {
    if (comment._id === array[i]._id) {
      check = true;
      return check;
    }
  }
  return check;
};
