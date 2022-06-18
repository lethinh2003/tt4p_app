import { combineReducers } from "redux";
import getUserReducer from "./getUserReducer";
import getToggleSettingReducer from "./getToggleSettingReducer";
import getDarkModeReducer from "./getDarkModeReducer";
import getToggleAboutMeReducer from "./getToggleAboutMeReducer";
import getToggleBannedReducer from "./getToggleBannedReducer";
import getAllUsersReducer from "./getAllUsersReducer";
import getPostActivityReducer from "./getPostActivityReducer";
import getPostHeartsReducer from "./getPostHeartsReducer";
import getListFollowingsReducer from "./getListFollowingsReducer";
import getListCommentsLoadingReducer from "./getListCommentsLoadingReducer";
const reducers = combineReducers({
  user: getUserReducer,
  useFollowing: getListFollowingsReducer,
  listCommentsLoading: getListCommentsLoadingReducer,
  postActivity: getPostActivityReducer,
  postHearts: getPostHeartsReducer,
  allUsers: getAllUsersReducer,
  toggleSetting: getToggleSettingReducer,
  toggleAboutMe: getToggleAboutMeReducer,
  toggleBanned: getToggleBannedReducer,
  darkMode: getDarkModeReducer,
});

export default (state, action) => reducers(state, action);
