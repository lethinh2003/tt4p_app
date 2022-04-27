import { combineReducers } from "redux";
import getUserReducer from "./getUserReducer";
import getToggleSettingReducer from "./getToggleSettingReducer";
import getDarkModeReducer from "./getDarkModeReducer";

const reducers = combineReducers({
  user: getUserReducer,
  toggleSetting: getToggleSettingReducer,
  darkMode: getDarkModeReducer,
});

export default (state, action) => reducers(state, action);
