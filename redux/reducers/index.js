import { combineReducers } from "redux";
import getUserReducer from "./getUserReducer";
import getToggleSettingReducer from "./getToggleSettingReducer";
import getDarkModeReducer from "./getDarkModeReducer";
import getToggleAboutMeReducer from "./getToggleAboutMeReducer";
import getToggleBannedReducer from "./getToggleBannedReducer";
import getAllUsersReducer from "./getAllUsersReducer";
import getPostActivityReducer from "./getPostActivityReducer";
import getListFollowingsReducer from "./getListFollowingsReducer";
import getListCommentsLoadingReducer from "./getListCommentsLoadingReducer";
import getSuggestFriendsReducer from "./getSuggestFriendsReducer";
import getListHeartedPostsReducer from "./getListHeartedPostsReducer";
import getPartnerReducer from "./getPartnerReducer";
import getPartnersCountReducer from "./getPartnersCountReducer";
import getMessagesCountReducer from "./getMessagesCountReducer";
import getFeedCategoryReducer from "./getFeedCategoryReducer";
import getUsersOnlineReducer from "./getUsersOnlineReducer";
const reducers = combineReducers({
  user: getUserReducer,
  usersOnline: getUsersOnlineReducer,
  partner: getPartnerReducer,
  feedCategory: getFeedCategoryReducer,
  partnersCount: getPartnersCountReducer,
  messagesCount: getMessagesCountReducer,
  suggestFriends: getSuggestFriendsReducer,
  userFollowing: getListFollowingsReducer,
  userHearted: getListHeartedPostsReducer,
  listCommentsLoading: getListCommentsLoadingReducer,
  postActivity: getPostActivityReducer,
  allUsers: getAllUsersReducer,
  toggleSetting: getToggleSettingReducer,
  toggleAboutMe: getToggleAboutMeReducer,
  toggleBanned: getToggleBannedReducer,
  darkMode: getDarkModeReducer,
});

export default (state, action) => reducers(state, action);
