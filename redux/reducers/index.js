import { combineReducers } from "redux";
import getUserReducer from "./getUserReducer";
import getToggleSettingReducer from "./getToggleSettingReducer";
import getDarkModeReducer from "./getDarkModeReducer";
import getToggleAboutMeReducer from "./getToggleAboutMeReducer";
import getToggleBannedReducer from "./getToggleBannedReducer";
import getAllUsersReducer from "./getAllUsersReducer";
import getPostActivityReducer from "./getPostActivityReducer";
import getPostHeartsReducer from "./getPostHeartsReducer";

const reducers = combineReducers({
  user: getUserReducer,
  postActivity: getPostActivityReducer,
  postHearts: getPostHeartsReducer,
  allUsers: getAllUsersReducer,
  toggleSetting: getToggleSettingReducer,
  toggleAboutMe: getToggleAboutMeReducer,
  toggleBanned: getToggleBannedReducer,
  darkMode: getDarkModeReducer,
});

export default (state, action) => reducers(state, action);
