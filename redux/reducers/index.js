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
import getSuggestFriendsReducer from "./getSuggestFriendsReducer";
import getListHeartedPostsReducer from "./getListHeartedPostsReducer";
const reducers = combineReducers({
  user: getUserReducer,
  suggestFriends: getSuggestFriendsReducer,
  userFollowing: getListFollowingsReducer,
  userHearted: getListHeartedPostsReducer,
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
