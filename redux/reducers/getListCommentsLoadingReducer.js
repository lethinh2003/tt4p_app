import { GET_LIST_COMMENTS_LOADING } from "../actions/constants";
const initialState = [];
const getListCommentsLoadingReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_LIST_COMMENTS_LOADING:
      if (state.includes(payload.data)) {
        state.splice(state.indexOf(payload.data), 1);
        return [...state];
      }
      return [...state, payload.data];
    default:
      return state;
  }
};
export default getListCommentsLoadingReducer;
