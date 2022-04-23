import { combineReducers } from "redux";
import getUserReducer from "./getUserReducer";

const reducers = combineReducers({
  user: getUserReducer,
});

export default (state, action) => reducers(state, action);
